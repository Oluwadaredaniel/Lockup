import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Animated,
  Easing,
  AppState,
  AppStateStatus
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { GuardianBear } from '../components/mascot/GuardianBear';
import { useFocusSession } from '../hooks/useFocusSession';
import { Typography } from '../components/ui/Typography';
import { LockLevel, formatDuration, SessionStatus, FocusEnvironment } from '../../../../packages/core';
import { NotificationService } from '../services/NotificationService';
import { ambientAudioService } from '../services/AmbientAudioService';
import Svg, { Circle } from 'react-native-svg';

import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');
const TIMER_SIZE = width * 0.7; // Smaller for minimalism
const STROKE_WIDTH = 12;
const RADIUS = (TIMER_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface Props {
  sessionData: {
    selectedTask: string;
    duration: number; // in minutes
    selectedLockLevel: LockLevel;
    environment: FocusEnvironment;
  };
  onComplete: () => void;
  onAbandon: () => void;
  onSimulateDistraction?: () => void;
}

export const ActiveFocusScreen: React.FC<Props> = ({ sessionData, onComplete, onAbandon, onSimulateDistraction }) => {
  const { theme } = useTheme();
  const { secondsRemaining, status, abandon, complete } = useFocusSession(sessionData.duration);
  const [mascotState, setMascotState] = useState<'focus' | 'alert' | 'disappointed'>('focus');
  const [isOverriding, setIsOverriding] = useState(false);
  const [overrideSecondsRemaining, setOverrideSecondsRemaining] = useState(180);
  const [isMuted, setIsMuted] = useState(false);
  const overrideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSeconds = sessionData.duration * 60;

  const shakeAnim = useRef(new Animated.Value(0)).current;

  const progress = secondsRemaining / totalSeconds;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';

  useEffect(() => {
    // Start ambient audio
    if (sessionData.environment !== 'none') {
      ambientAudioService.play(sessionData.environment);
    }
    return () => {
      ambientAudioService.stop();
    };
  }, []);

  useEffect(() => {
    if (status === SessionStatus.Completed) {
      onComplete();
    } else if (status === SessionStatus.Abandoned) {
      onAbandon();
    }
  }, [status]);

  useEffect(() => {
    if (isOverriding && overrideSecondsRemaining > 0) {
      overrideTimerRef.current = setInterval(() => {
        setOverrideSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (overrideSecondsRemaining <= 0) {
      if (overrideTimerRef.current) clearInterval(overrideTimerRef.current);
    }

    return () => {
      if (overrideTimerRef.current) clearInterval(overrideTimerRef.current);
    };
  }, [isOverriding, overrideSecondsRemaining]);

  const handleExit = () => {
    if (sessionData.selectedLockLevel === LockLevel.Flexible) {
      abandon();
    } else if (sessionData.selectedLockLevel === LockLevel.Commitment) {
      setMascotState('disappointed');
      Alert.alert(
        "Break Commitment?",
        "If you leave now, you will lose XP and your streak protection will be at risk.",
        [
          { text: "Stay Focused", style: "cancel", onPress: () => setMascotState('focus') },
          { text: "Abandon", style: "destructive", onPress: abandon }
        ]
      );
    } else {
      // Level 3: Strict Mode
      if (isOverriding) {
        triggerShake();
        return;
      }

      setMascotState('alert');
      Alert.alert(
        "Emergency Override",
        "Strict Mode is active. To exit, you must wait for a 3-minute cool-down period. XP and Streaks will be heavily penalized.",
        [
          { text: "Keep Focusing", style: "cancel", onPress: () => setMascotState('focus') },
          {
            text: "Start Cool-down",
            style: "destructive",
            onPress: () => {
              setIsOverriding(true);
              setMascotState('disappointed');
            }
          }
        ]
      );
    }
  };

  const handleOverrideAbandon = () => {
    if (overrideSecondsRemaining <= 0) {
      abandon();
    } else {
      triggerShake();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <View style={[styles.levelBadge, { backgroundColor: isOverriding ? '#EF4444' : '#7C3AED' }]}>
          <Typography variant="label" color="white" weight="bold">
            {isOverriding ? 'EMERGENCY OVERRIDE' : `Level ${sessionData.selectedLockLevel}: ${LockLevel[sessionData.selectedLockLevel]}`}
          </Typography>
        </View>
        <Typography variant="h2" weight="black">{sessionData.selectedTask}</Typography>
      </View>

      <View style={styles.timerContainer}>
        <Svg width={TIMER_SIZE} height={TIMER_SIZE} style={styles.gauge}>
          <Circle
            cx={TIMER_SIZE / 2}
            cy={TIMER_SIZE / 2}
            r={RADIUS}
            stroke={isDark ? '#1E293B' : '#E2E8F0'}
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />
          <Circle
            cx={TIMER_SIZE / 2}
            cy={TIMER_SIZE / 2}
            r={RADIUS}
            stroke={isOverriding ? '#EF4444' : '#7C3AED'}
            strokeWidth={STROKE_WIDTH}
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={isOverriding ? (CIRCUMFERENCE * (1 - overrideSecondsRemaining / 180)) : strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${TIMER_SIZE / 2} ${TIMER_SIZE / 2})`}
          />
        </Svg>

        <View style={styles.timerContent}>
          <GuardianBear state={mascotState} size={140} />
          {isOverriding ? (
            <View style={{ alignItems: 'center' }}>
              <Typography variant="h1" weight="black" color="#EF4444" style={{ fontSize: 64, marginTop: 16 }}>
                {formatDuration(overrideSecondsRemaining)}
              </Typography>
              <Typography variant="caption" color="#EF4444" weight="bold">COOL-DOWN ACTIVE</Typography>
            </View>
          ) : (
            <Typography variant="h1" weight="black" style={{ fontSize: 64, marginTop: 16 }}>
              {formatDuration(secondsRemaining)}
            </Typography>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        {isOverriding ? (
          <Typography variant="body" color="#EF4444" weight="bold">Sit with your discomfort.</Typography>
        ) : (
          <View style={{ alignItems: 'center', gap: 12 }}>
            {sessionData.environment !== 'none' && (
              <TouchableOpacity
                onPress={() => {
                  setIsMuted(!isMuted);
                  ambientAudioService.setVolume(isMuted ? 0.5 : 0);
                  Haptics.selectionAsync();
                }}
                style={styles.audioControl}
              >
                <Typography variant="caption" weight="black" color="#7C3AED">
                  {isMuted ? '🔈 UNMUTE' : `🔊 ${sessionData.environment.toUpperCase()}`}
                </Typography>
              </TouchableOpacity>
            )}
            <Typography variant="caption" color="#94A3B8" weight="semibold">
              Focused on {sessionData.selectedTask}
            </Typography>
          </View>
        )}

        <Animated.View style={{ transform: [{ translateX: shakeAnim }], width: '100%', alignItems: 'center' }}>
          {isOverriding ? (
            <TouchableOpacity
              onPress={handleOverrideAbandon}
              disabled={overrideSecondsRemaining > 0}
              style={[
                styles.exitButton,
                { borderColor: overrideSecondsRemaining > 0 ? '#334155' : '#EF4444' },
                overrideSecondsRemaining > 0 && { opacity: 0.5 }
              ]}
            >
              <Typography variant="caption" weight="bold" color={overrideSecondsRemaining > 0 ? '#94A3B8' : '#EF4444'}>
                {overrideSecondsRemaining > 0 ? 'Wait to Exit...' : 'Confirm Exit (Penalty Applies)'}
              </Typography>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleExit}
              style={[
                styles.exitButton,
                { borderColor: isDark ? '#334155' : '#E2E8F0' },
                sessionData.selectedLockLevel === LockLevel.Strict && { opacity: 1, borderColor: '#7C3AED' }
              ]}
            >
              <Typography variant="caption" weight="bold" color={isDark ? '#94A3B8' : '#64748B'}>
                {sessionData.selectedLockLevel === LockLevel.Strict ? '🔒 Strict Mode Exit' : 'Give Up'}
              </Typography>
            </TouchableOpacity>
          )}
        </Animated.View>

        {!isOverriding && (
          <Typography variant="caption" style={{ fontSize: 10, opacity: 0.6 }} color="#94A3B8" weight="bold">
            All other apps remain accessible. Focus on your work.
          </Typography>
        )}

        {onSimulateDistraction && (
          <TouchableOpacity onPress={onSimulateDistraction} style={styles.debugButton}>
            <Typography variant="caption" style={{ fontStyle: 'italic' }} color="#94A3B8">
              [DEBUG] Simulate Distraction
            </Typography>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 48,
  },
  header: {
    alignItems: 'center',
    gap: 12,
  },
  levelBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: '900',
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: TIMER_SIZE,
    height: TIMER_SIZE,
  },
  gauge: {
    position: 'absolute',
  },
  timerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 64,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
    marginTop: 16,
  },
  footer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
    gap: 24,
  },
  instruction: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '600',
  },
  audioControl: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.2)',
  },
  exitButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 1,
  },
  exitButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  debugButton: {
    marginTop: 8,
  },
  debugText: {
    fontSize: 10,
    color: '#94A3B8',
    fontStyle: 'italic',
  }
});
