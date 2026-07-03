import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  title: string;
  emoji: string;
  unlocked: boolean;
  date?: string;
}

export const AchievementBadge: React.FC<Props> = ({ title, emoji, unlocked, date }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const bgColor = unlocked
    ? (isDark ? 'rgba(124, 58, 237, 0.2)' : 'rgba(124, 58, 237, 0.1)')
    : (isDark ? '#1E293B' : '#F1F5F9');

  const borderColor = unlocked ? '#7C3AED' : (isDark ? '#334155' : '#E2E8F0');
  const textColor = unlocked ? (isDark ? '#FAF8FF' : '#111827') : '#94A3B8';

  return (
    <View style={[styles.container, { backgroundColor: bgColor, borderColor }]}>
      <Text style={[styles.emoji, !unlocked && styles.locked]}>{emoji}</Text>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      {unlocked && date && <Text style={styles.date}>{date}</Text>}
      {!unlocked && (
        <View style={styles.lockIcon}>
          <Text style={styles.lockText}>🔒</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '46%',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  locked: {
    opacity: 0.2,
    grayscale: 1, // Note: grayscale doesn't work in RN like this, but opacity does the trick
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },
  date: {
    fontSize: 10,
    color: '#7C3AED',
    fontWeight: '600',
    marginTop: 4,
  },
  lockIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  lockText: {
    fontSize: 12,
  }
});
