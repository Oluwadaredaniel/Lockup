import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { AchievementBadge } from '../components/achievements/AchievementBadge';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';

interface Props {
  onBack: () => void;
}

const ACHIEVEMENTS = [
  { id: '1', title: 'First Session', emoji: '🎯', unlocked: true, date: 'Oct 12' },
  { id: '2', title: '7 Day Streak', emoji: '🔥', unlocked: true, date: 'Oct 19' },
  { id: '3', title: 'Deep Work Master', emoji: '🧠', unlocked: true, date: 'Oct 20' },
  { id: '4', title: 'Early Bird', emoji: '🌅', unlocked: false },
  { id: '5', title: '30 Day Streak', emoji: '👑', unlocked: false },
  { id: '6', title: 'Distraction Slayer', emoji: '⚔️', unlocked: false },
  { id: '7', title: '100 Focus Hours', emoji: '⏳', unlocked: false },
  { id: '8', title: 'Elite Discipline', emoji: '💎', unlocked: false },
];

export const AchievementsGalleryScreen: React.FC<Props> = ({ onBack }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';
  const textColor = isDark ? '#FAF8FF' : '#111827';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Typography variant="body" weight="semibold" color="#7C3AED">Back</Typography>
        </TouchableOpacity>
        <Typography variant="h3" weight="black">Achievements</Typography>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Card style={styles.summaryCard} padding={24}>
          <Typography variant="label" color="#94A3B8" weight="black" style={{ marginBottom: 16 }}>
            3 / 8 ACHIEVEMENTS UNLOCKED
          </Typography>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '37.5%' }]} />
          </View>
        </Card>

        <View style={styles.grid}>
          {ACHIEVEMENTS.map(item => (
            <AchievementBadge
              key={item.id}
              title={item.title}
              emoji={item.emoji}
              unlocked={item.unlocked}
              date={item.date}
            />
          ))}
        </View>
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
  },
  summaryCard: {
    backgroundColor: '#0F172A',
    padding: 24,
    borderRadius: 24,
    marginBottom: 32,
  },
  summaryText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7C3AED',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }
});
