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
import { LockLevel } from '../../../../packages/core/types';

interface Props {
  onBack: () => void;
  onStart: (sessionData: any) => void;
}

const TASKS = ['Deep Work', 'Study', 'Coding', 'Reading', 'Exercise'];
const DURATIONS = [15, 30, 45, 60, 90, 120];

export const FocusSessionSetupScreen: React.FC<Props> = ({ onBack, onStart }) => {
  const { theme } = useTheme();
  const [selectedTask, setSelectedTask] = useState('Deep Work');
  const [duration, setDuration] = useState(30);
  const [selectedLockLevel, setSelectedLockLevel] = useState<LockLevel>(LockLevel.Commitment);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';
  const textColor = isDark ? '#FAF8FF' : '#111827';
  const cardColor = isDark ? '#0F172A' : '#FFFFFF';
  const borderColor = isDark ? '#1E293B' : '#E2E8F0';

  const getLockLevelDesc = (level: LockLevel) => {
    switch (level) {
      case LockLevel.Flexible: return 'Exit anytime. No penalties. Best for beginners.';
      case LockLevel.Commitment: return 'Exit allowed but lose XP and streak protection.';
      case LockLevel.Strict: return 'Cannot exit until timer ends. Emergency override only.';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={[styles.backText, { color: '#7C3AED' }]}>Cancel</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>Setup Session</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Task Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>What are you focusing on?</Text>
          <View style={styles.chipContainer}>
            {TASKS.map(task => (
              <TouchableOpacity
                key={task}
                onPress={() => setSelectedTask(task)}
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
          <Text style={[styles.sectionTitle, { color: textColor }]}>For how long?</Text>
          <View style={styles.chipContainer}>
            {DURATIONS.map(d => (
              <TouchableOpacity
                key={d}
                onPress={() => setDuration(d)}
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

        {/* Lock Level Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Select Lock Level</Text>
          {[LockLevel.Flexible, LockLevel.Commitment, LockLevel.Strict].map(level => (
            <TouchableOpacity
              key={level}
              onPress={() => setSelectedLockLevel(level)}
              style={[
                styles.lockCard,
                { backgroundColor: cardColor, borderColor },
                selectedLockLevel === level && { borderColor: '#7C3AED', borderWidth: 2 }
              ]}
            >
              <View style={styles.lockHeader}>
                <Text style={[styles.lockTitle, { color: textColor }]}>
                  Level {level}: {LockLevel[level]}
                </Text>
                {selectedLockLevel === level && <View style={styles.selectedDot} />}
              </View>
              <Text style={styles.lockDesc}>{getLockLevelDesc(level)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.startButton}
          activeOpacity={0.9}
          onPress={() => onStart({ selectedTask, duration, selectedLockLevel })}
        >
          <Text style={styles.startButtonText}>Initiate Focus</Text>
        </TouchableOpacity>

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
