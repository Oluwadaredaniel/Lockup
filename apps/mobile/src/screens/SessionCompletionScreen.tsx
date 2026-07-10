import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { GuardianBear } from '../components/mascot/GuardianBear';
import { useUser } from '../context/UserContext';
import { calculateSessionXP, LockLevel, SessionStatus } from '../../../../packages/core';
import { Typography } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

import * as Haptics from 'expo-haptics';

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
  const { user, completeSession } = useUser();
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const xpEarned = calculateSessionXP(
    sessionData.duration,
    sessionData.selectedLockLevel,
    SessionStatus.Completed
  );

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    completeSession(xpEarned);

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Loop for reward card pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';
  const textColor = isDark ? '#FAF8FF' : '#111827';
  const cardColor = isDark ? '#0F172A' : '#FFFFFF';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.content}>
        <View style={styles.celebrationContainer}>
           <GuardianBear state="focus" size={240} />
        </View>

        <Typography variant="h1" weight="black" textAlign="center" style={{ marginBottom: 8 }}>
          Session Complete
        </Typography>
        <Typography variant="body" color="#64748B" textAlign="center" style={{ marginBottom: 40 }}>
          You protected your focus for {sessionData.duration} minutes.
        </Typography>

        <Animated.View
          style={[
            styles.rewardCardWrapper,
            {
              opacity: opacityAnim,
              transform: [
                { scale: scaleAnim },
                { scale: pulseAnim }
              ]
            }
          ]}
        >
          <Card padding={32} style={styles.rewardCard}>
            <View style={styles.rewardItem}>
              <Typography variant="label" weight="black" color="#94A3B8" style={{ letterSpacing: 1 }}>XP EARNED</Typography>
              <Typography variant="h1" weight="black" color="#7C3AED">+{xpEarned}</Typography>
            </View>
            <View style={styles.divider} />
            <View style={styles.rewardItem}>
              <Typography variant="label" weight="black" color="#94A3B8" style={{ letterSpacing: 1 }}>LEVEL</Typography>
              <Typography variant="h1" weight="black">{user?.level || 1}</Typography>
            </View>
          </Card>
        </Animated.View>

        {/* Level Progress Bar (Duolingo Style) */}
        <View style={styles.levelProgressContainer}>
          <View style={styles.levelInfo}>
            <Typography variant="label" weight="black">LEVEL {user?.level}</Typography>
            <Typography variant="label" weight="black" color="#94A3B8">
              {user?.xp ? (user.xp % 500) : 0} / 500 XP
            </Typography>
          </View>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${((user?.xp || 0) % 500) / 500 * 100}%` }
              ]}
            />
          </View>
        </View>

        <View style={styles.messageContainer}>
          <Typography variant="body" color="#64748B" textAlign="center" style={{ fontStyle: 'italic', lineHeight: 24 }}>
            "Discipline is the bridge between goals and accomplishment."
          </Typography>
        </View>

        <Button
          title="Collect Rewards"
          onPress={onContinue}
          size="large"
          style={{ width: '100%' }}
        />
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
  rewardCardWrapper: {
    width: '100%',
    marginBottom: 32,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.1)',
  },
  rewardItem: {
    alignItems: 'center',
    gap: 8,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  levelProgressContainer: {
    width: '100%',
    marginBottom: 48,
  },
  levelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressBarBg: {
    height: 12,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#7C3AED',
    borderRadius: 6,
  },
  messageContainer: {
    paddingHorizontal: 32,
    marginBottom: 48,
  },
});
