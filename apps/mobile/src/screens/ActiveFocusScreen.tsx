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
import { LockLevel, formatDuration, SessionStatus } from '../../../../packages/core';
import { NotificationService } from '../services/NotificationService';
import Svg, { Circle } from 'react-native-svg';

import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');
const TIMER_SIZE = width * 0.8;
const STROKE_WIDTH = 12;
const RADIUS = (TIMER_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface Props {
  sessionData: {
    selectedTask: string;
    duration: number; // in minutes
    selectedLockLevel: LockLevel;
  };
  onComplete: () => void;
  onAbandon: () => void;
  onSimulateDistraction?: () => void;
}

export const ActiveFocusScreen: React.FC<Props> = ({ sessionData, onComplete, onAbandon, onSimulateDistraction }) => {
  const { theme } = useTheme();
  const { secondsRemaining, status, abandon, complete } = useFocusSession(sessionData.duration);
  const [mascotState, setMascotState] = useState<'focus' | 'alert' | 'disappointed'>('focus');
  const totalSeconds = sessionData.duration * 60;

  const shakeAnim = useRef(new Animated.Value(0)).current;

  const progress = secondsRemaining / totalSeconds;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';
  const textColor = isDark ? '#FAF8FF' : '#111827';

  useEffect(() => {
    if (status === SessionStatus.Completed) {
      onComplete();
    } else if (status === SessionStatus.Abandoned) {
      onAbandon();
    }
  }, [status]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        nextAppState === 'background' &&
        sessionData.selectedLockLevel !== LockLevel.Flexible
      ) {
        // User left the app during a committed session
        NotificationService.sendInstantNotification(
          "Get Back to Focus! 🐾",
          "The Guardian Bear noticed you left. Your focus session is still active.",
          { screen: 'active_focus' }
        );
      } else if (
        nextAppState === 'active' &&
        sessionData.selectedLockLevel === LockLevel.Strict &&
        onSimulateDistraction
      ) {
        // User returned - in a strict session we simulate the overlay
        // In a real app this would be triggered by an actual distraction
        // onSimulateDistraction();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);

  const triggerShake = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true })
    ]).start();
  };

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
      triggerShake();
      setMascotState('alert');
      Alert.alert(
        "Session Locked",
        "This is a Level 3 Strict Session. You cannot exit until the timer completes.",
        [{ text: "Understood", style: "default", onPress: () => setMascotState('focus') }]
      );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <View style={[styles.levelBadge, { backgroundColor: '#7C3AED' }]}>
          <Typography variant="label" color="white" weight="bold">
            Level {sessionData.selectedLockLevel}: {LockLevel[sessionData.selectedLockLevel]}
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
            stroke="#7C3AED"
            strokeWidth={STROKE_WIDTH}
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${TIMER_SIZE / 2} ${TIMER_SIZE / 2})`}
          />
        </Svg>

        <View style={styles.timerContent}>
          <GuardianBear state={mascotState} size={140} />
          <Typography variant="h1" weight="black" style={{ fontSize: 64, marginTop: 16 }}>
            {formatDuration(secondsRemaining)}
          </Typography>
        </View>
      </View>

      <View style={styles.footer}>
        <Typography variant="body" color="#94A3B8" weight="semibold">Stay focused on your task</Typography>
        <Animated.View style={{ transform: [{ translateX: shakeAnim }], width: '100%', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={handleExit}
            style={[
              styles.exitButton,
              { borderColor: isDark ? '#334155' : '#E2E8F0' },
              sessionData.selectedLockLevel === LockLevel.Strict && { opacity: 0.5 }
            ]}
          >
            <Typography variant="caption" weight="bold" color={isDark ? '#94A3B8' : '#64748B'}>
              {sessionData.selectedLockLevel === LockLevel.Strict ? '🔒 Locked' : 'Give Up'}
            </Typography>
          </TouchableOpacity>
        </Animated.View>

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
