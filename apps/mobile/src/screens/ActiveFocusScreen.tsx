import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { GuardianBear } from '../components/mascot/GuardianBear';
import { LockLevel, formatDuration } from '../../../../packages/core';
import Svg, { Circle } from 'react-native-svg';

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
  const [secondsRemaining, setSecondsRemaining] = useState(sessionData.duration * 60);
  const totalSeconds = sessionData.duration * 60;

  const progress = secondsRemaining / totalSeconds;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';
  const textColor = isDark ? '#FAF8FF' : '#111827';

  useEffect(() => {
    if (secondsRemaining <= 0) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsRemaining]);

  const handleExit = () => {
    if (sessionData.selectedLockLevel === LockLevel.Flexible) {
      onAbandon();
    } else if (sessionData.selectedLockLevel === LockLevel.Commitment) {
      Alert.alert(
        "Break Commitment?",
        "If you leave now, you will lose XP and your streak protection will be at risk.",
        [
          { text: "Stay Focused", style: "cancel" },
          { text: "Abandon", style: "destructive", onPress: onAbandon }
        ]
      );
    } else {
      Alert.alert(
        "Session Locked",
        "This is a Level 3 Strict Session. You cannot exit until the timer completes.",
        [{ text: "Understood", style: "default" }]
      );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <View style={[styles.levelBadge, { backgroundColor: '#7C3AED' }]}>
          <Text style={styles.levelText}>Level {sessionData.selectedLockLevel}: {LockLevel[sessionData.selectedLockLevel]}</Text>
        </View>
        <Text style={[styles.taskTitle, { color: textColor }]}>{sessionData.selectedTask}</Text>
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
          <GuardianBear state="focus" size={140} />
          <Text style={[styles.timerText, { color: textColor }]}>
            {formatDuration(secondsRemaining)}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.instruction}>Stay focused on your task</Text>
        <TouchableOpacity
          onPress={handleExit}
          style={[
            styles.exitButton,
            { borderColor: isDark ? '#334155' : '#E2E8F0' },
            sessionData.selectedLockLevel === LockLevel.Strict && { opacity: 0.5 }
          ]}
        >
          <Text style={[styles.exitButtonText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
            {sessionData.selectedLockLevel === LockLevel.Strict ? '🔒 Locked' : 'Give Up'}
          </Text>
        </TouchableOpacity>

        {onSimulateDistraction && (
          <TouchableOpacity onPress={onSimulateDistraction} style={styles.debugButton}>
            <Text style={styles.debugText}>[DEBUG] Simulate Distraction</Text>
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
