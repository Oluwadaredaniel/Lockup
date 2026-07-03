import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

interface Props {
  stats: {
    streak: number;
    hoursFocused: number;
    disciplineScore: number;
    level: number;
  };
  userName: string;
}

export const ShareableStreakCard: React.FC<Props> = ({ stats, userName }) => {
  return (
    <View style={styles.cardContainer}>
      {/* Premium Gradient Background Placeholder */}
      <View style={styles.background}>
        <View style={styles.overlay} />

        {/* The Flagship 3D Bear */}
        <Image
          source={require('../../../../assets/guardian_bear_3d.png')}
          style={styles.bearImage}
          resizeMode="contain"
        />

        {/* Brand Header */}
        <View style={styles.header}>
          <Text style={styles.brandName}>LOCKUP</Text>
          <Text style={styles.tagline}>Discipline Beats Motivation</Text>
        </View>

        {/* User Name & Status */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userStatus}>Discipline Level {stats.level}</Text>
        </View>

        {/* The Big Stat: Streak */}
        <View style={styles.mainStatContainer}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <Text style={styles.streakValue}>{stats.streak}</Text>
          <Text style={styles.streakLabel}>DAY STREAK</Text>
        </View>

        {/* Secondary Stats Footer */}
        <View style={styles.footerStats}>
          <View style={styles.footerItem}>
            <Text style={styles.footerValue}>{stats.hoursFocused}h</Text>
            <Text style={styles.footerLabel}>FOCUSED</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.footerItem}>
            <Text style={styles.footerValue}>{stats.disciplineScore}</Text>
            <Text style={styles.footerLabel}>DISCIPLINE SCORE</Text>
          </View>
        </View>

        {/* Branding Footer */}
        <Text style={styles.joinText}>Join the Sentinel at lockup.app</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width - 48,
    aspectRatio: 0.8, // Optimized for Instagram Post/Story feed
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#020617',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
  background: {
    flex: 1,
    padding: 32,
    justifyContent: 'space-between',
    backgroundColor: '#0F172A',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(124, 58, 237, 0.05)', // Subtle violet tint
  },
  bearImage: {
    position: 'absolute',
    right: -20,
    bottom: 60,
    width: width * 0.5,
    height: width * 0.5,
    opacity: 0.8,
  },
  header: {
    marginBottom: 20,
  },
  brandName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FAF8FF',
    letterSpacing: 4,
  },
  tagline: {
    fontSize: 10,
    color: '#8B5CF6',
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  userInfo: {
    marginTop: 0,
  },
  userName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FAF8FF',
  },
  userStatus: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
  },
  mainStatContainer: {
    alignItems: 'flex-start',
    marginVertical: 20,
  },
  streakEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  streakValue: {
    fontSize: 84,
    fontWeight: '900',
    color: '#7C3AED',
    lineHeight: 84,
  },
  streakLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FAF8FF',
    letterSpacing: 2,
  },
  footerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  footerItem: {
    alignItems: 'flex-start',
  },
  footerValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FAF8FF',
  },
  footerLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 1,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  joinText: {
    fontSize: 10,
    color: '#475569',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 20,
  }
});
