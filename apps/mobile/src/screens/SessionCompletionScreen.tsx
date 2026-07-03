import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { GuardianBear } from '../components/mascot/GuardianBear';
import { calculateSessionXP, LockLevel } from '../../../../packages/core';

const { width } = Dimensions.get('window');

interface Props {
  sessionData: {
    selectedTask: string;
    duration: number;
    selectedLockLevel: LockLevel;
  };
  onContinue: () => void;
}

export const SessionCompletionScreen: React.FC<Props> = ({ sessionData, onContinue }) => {
  const { theme } = useTheme();

  const xpEarned = calculateSessionXP(
    sessionData.duration,
    sessionData.selectedLockLevel,
    'completed' as any // Use string for now as it's mocked
  );

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';
  const textColor = isDark ? '#FAF8FF' : '#111827';
  const cardColor = isDark ? '#0F172A' : '#FFFFFF';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.content}>
        <View style={styles.celebrationContainer}>
           <GuardianBear state="focus" size={240} />
           {/* In a real app, we would add particle effects here */}
        </View>

        <Text style={[styles.title, { color: textColor }]}>Session Complete</Text>
        <Text style={styles.subtitle}>You protected your focus for {sessionData.duration} minutes.</Text>

        <View style={[styles.rewardCard, { backgroundColor: cardColor }]}>
          <View style={styles.rewardItem}>
            <Text style={styles.rewardLabel}>XP EARNED</Text>
            <Text style={[styles.rewardValue, { color: '#7C3AED' }]}>+{xpEarned}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.rewardItem}>
            <Text style={styles.rewardLabel}>LEVEL</Text>
            <Text style={[styles.rewardValue, { color: textColor }]}>12</Text>
          </View>
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.quote}>"Discipline is the bridge between goals and accomplishment."</Text>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.9}
          onPress={onContinue}
        >
          <Text style={styles.continueButtonText}>Collect Rewards</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  celebrationContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '500',
  },
  rewardCard: {
    width: '100%',
    padding: 32,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 48,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.1)',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  rewardItem: {
    alignItems: 'center',
  },
  rewardLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 8,
  },
  rewardValue: {
    fontSize: 32,
    fontWeight: '900',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E2E8F0',
  },
  messageContainer: {
    paddingHorizontal: 32,
    marginBottom: 48,
  },
  quote: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  continueButton: {
    backgroundColor: '#7C3AED',
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
  },
});
