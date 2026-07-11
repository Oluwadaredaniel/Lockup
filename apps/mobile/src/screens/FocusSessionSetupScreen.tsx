import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { LockLevel, FocusEnvironment } from '../../../../packages/core/types';
import * as Haptics from 'expo-haptics';
import { Typography } from '../components/ui/Typography';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface Props {
  onBack: () => void;
  onStart: (sessionData: any) => void;
}

const TASKS = ['Deep Work', 'Study', 'Coding', 'Reading', 'Exercise'];
const DURATIONS = [15, 30, 45, 60, 90, 120];
const ENVIRONMENTS: { id: FocusEnvironment; label: string; emoji: string }[] = [
  { id: 'none', label: 'None', emoji: '🔇' },
  { id: 'rain', label: 'Rain', emoji: '🌧️' },
  { id: 'lofi', label: 'Lo-Fi', emoji: '🎧' },
  { id: 'coffee', label: 'Coffee', emoji: '☕' },
  { id: 'library', label: 'Library', emoji: '📚' },
  { id: 'forest', label: 'Forest', emoji: '🌲' },
];

export const FocusSessionSetupScreen: React.FC<Props> = ({ onBack, onStart }) => {
  const { theme } = useTheme();
  const [selectedTask, setSelectedTask] = useState('Deep Work');
  const [duration, setDuration] = useState(30);
  const [selectedLockLevel, setSelectedLockLevel] = useState<LockLevel>(LockLevel.Commitment);
  const [environment, setEnvironment] = useState<FocusEnvironment>('none');

  // Animation for "Hold to Commit"
  const progress = useSharedValue(0);
  const scale = useSharedValue(1);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';
  const textColor = isDark ? '#FAF8FF' : '#111827';
  const cardColor = isDark ? '#0F172A' : '#FFFFFF';
  const borderColor = isDark ? '#1E293B' : '#E2E8F0';

  const gesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.95);
      progress.value = withTiming(1, { duration: 1500 });
      runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
      if (progress.value < 1) {
        progress.value = withTiming(0, { duration: 300 });
      } else {
        runOnJS(Haptics.notificationAsync)(Haptics.NotificationFeedbackType.Success);
        runOnJS(onStart)({ selectedTask, duration, selectedLockLevel, environment });
      }
    });

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: progress.value === 1 ? '#10B981' : '#7C3AED',
  }));

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const getLockLevelDesc = (level: LockLevel) => {
    switch (level) {
      case LockLevel.Flexible: return 'Exit anytime. No penalties. Best for beginners.';
      case LockLevel.Commitment: return 'Exit allowed but lose XP and streak protection.';
      case LockLevel.Strict: return 'Hard-block distracting apps. 3-min exit delay. Heavy penalties.';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Typography variant="body" color="#7C3AED" weight="bold">Cancel</Typography>
        </TouchableOpacity>
        <Typography variant="h3" weight="black">Setup Session</Typography>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Task Selection */}
        <View style={styles.section}>
          <Typography variant="label" weight="black" style={{ marginBottom: 16 }}>GOAL</Typography>
          <View style={styles.chipContainer}>
            {TASKS.map(task => (
              <TouchableOpacity
                key={task}
                onPress={() => {
                  Haptics.selectionAsync();
                  setSelectedTask(task);
                }}
                style={[
                  styles.chip,
                  { borderColor },
                  selectedTask === task && { backgroundColor: '#7C3AED', borderColor: '#7C3AED' }
                ]}
              >
                <Text style={[
                  styles.chipText,
                  { color: isDark ? '#94A3B8' : '#64748B' },
                  selectedTask === task && { color: 'white' }
                ]}>{task}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Duration Selection */}
        <View style={styles.section}>
          <Typography variant="label" weight="black" style={{ marginBottom: 16 }}>DURATION</Typography>
          <View style={styles.chipContainer}>
            {DURATIONS.map(d => (
              <TouchableOpacity
                key={d}
                onPress={() => {
                  Haptics.selectionAsync();
                  setDuration(d);
                }}
                style={[
                  styles.chip,
                  { borderColor },
                  duration === d && { backgroundColor: '#7C3AED', borderColor: '#7C3AED' }
                ]}
              >
                <Text style={[
                  styles.chipText,
                  { color: isDark ? '#94A3B8' : '#64748B' },
                  duration === d && { color: 'white' }
                ]}>{d}m</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Environment Selection */}
        <View style={styles.section}>
          <Typography variant="label" weight="black" style={{ marginBottom: 16 }}>ENVIRONMENT</Typography>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {ENVIRONMENTS.map(env => (
              <TouchableOpacity
                key={env.id}
                onPress={() => {
                  Haptics.selectionAsync();
                  setEnvironment(env.id);
                }}
                style={[
                  styles.envChip,
                  { borderColor, backgroundColor: cardColor },
                  environment === env.id && { borderColor: '#7C3AED', backgroundColor: 'rgba(124, 58, 237, 0.1)' }
                ]}
              >
                <Text style={{ fontSize: 24 }}>{env.emoji}</Text>
                <Typography variant="caption" weight="bold">{env.label}</Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Lock Level Selection */}
        <View style={styles.section}>
          <Typography variant="label" weight="black" style={{ marginBottom: 16 }}>LOCK LEVEL</Typography>
          {[LockLevel.Flexible, LockLevel.Commitment, LockLevel.Strict].map(level => (
            <TouchableOpacity
              key={level}
              onPress={() => {
                Haptics.selectionAsync();
                setSelectedLockLevel(level);
              }}
              style={[
                styles.lockCard,
                { backgroundColor: cardColor, borderColor },
                selectedLockLevel === level && { borderColor: '#7C3AED', borderWidth: 2 }
              ]}
            >
              <View style={styles.lockHeader}>
                <Typography variant="body" weight="black">
                  Level {level}: {LockLevel[level]}
                </Typography>
                {selectedLockLevel === level && <View style={styles.selectedDot} />}
              </View>
              <Typography variant="caption" color="#64748B">{getLockLevelDesc(level)}</Typography>
            </TouchableOpacity>
          ))}
        </View>

        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.holdButton, animatedButtonStyle]}>
            <Animated.View style={[styles.progressOverlay, animatedProgressStyle]} />
            <Typography variant="h3" weight="black" color="white">
              Hold to Commit
            </Typography>
          </Animated.View>
        </GestureDetector>
        <Typography variant="caption" weight="bold" color="#94A3B8" style={{ textAlign: 'center', marginTop: 12 }}>
          {selectedLockLevel === LockLevel.Strict ? '🔒 Only blocked apps will be inaccessible' : '✨ Your focus, protected.'}
        </Typography>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 60,
  },
  section: {
    marginBottom: 32,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  envChip: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 90,
    gap: 8,
  },
  lockCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  lockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#7C3AED',
  },
  holdButton: {
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  progressOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  lockCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  lockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  lockTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  lockDesc: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  selectedDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#7C3AED',
  },
  startButton: {
    backgroundColor: '#7C3AED',
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
  },
});
