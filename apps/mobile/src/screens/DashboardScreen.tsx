import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { GuardianBear } from '../components/mascot/GuardianBear';
import { Typography } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/feedback/EmptyState';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { getDisciplineStatus, getDisciplineStatusColor } from '../../../../packages/core';

const { width } = Dimensions.get('window');
const GAUGE_SIZE = width * 0.7;
const STROKE_WIDTH = 20;
const RADIUS = (GAUGE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface Props {
  onStartSession: () => void;
  onShare: () => void;
  onViewAchievements: () => void;
  onViewXP: () => void;
  onViewProfile: () => void;
  onViewShop: () => void;
  onViewHistory: () => void;
}

export const DashboardScreen: React.FC<Props> = ({
  onStartSession,
  onShare,
  onViewAchievements,
  onViewXP,
  onViewProfile,
  onViewShop,
  onViewHistory
}) => {
  const { theme } = useTheme();
  const { user } = useUser();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const gaugeAnim = useRef(new Animated.Value(0)).current;

  const hasData = !!user;
  const disciplineScore = user?.disciplineScore || 0;
  const progress = disciplineScore / 1000;
  const activity = user?.weeklyActivity || [0, 0, 0, 0, 0, 0, 0];

  const barAnims = useRef(activity.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Sequence: Entry animation for the whole dashboard
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      // Gauge "draw" animation
      Animated.timing(gaugeAnim, {
        toValue: progress,
        duration: 1500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      // Staggered bar growth animation
      Animated.stagger(100, barAnims.map((anim, i) =>
        Animated.timing(anim, {
          toValue: activity[i],
          duration: 1000,
          easing: Easing.out(Easing.exp),
          useNativeDriver: false, // height cannot be animated with native driver
        })
      ))
    ]).start();
  }, [user]);

  // Using Animated's current value to calculate the stroke offset dynamically
  const strokeDashoffset = gaugeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, CIRCUMFERENCE * (1 - progress)],
  });

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';
  const textColor = isDark ? '#FAF8FF' : '#111827';
  const cardColor = isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)';

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }}
      >

        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onViewProfile}>
            <Typography variant="caption" weight="semibold" color="#64748B">Good Morning,</Typography>
            <Typography variant="h2" weight="black">{user?.name || 'Guardian'}</Typography>
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={onViewHistory} style={styles.shareIconButton}>
              <Text style={styles.shareIcon}>📊</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onViewShop} style={styles.gemBadge}>
              <Typography variant="label" color="#10B981" weight="bold">💎 {user?.gems || 0}</Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare} style={styles.shareIconButton}>
              <Text style={styles.shareIcon}>🔗</Text>
            </TouchableOpacity>
            <View style={[styles.levelBadge, { backgroundColor: '#7C3AED' }]}>
              <Typography variant="label" color="white" weight="bold">Level {user?.level || 1}</Typography>
            </View>
          </View>
        </View>

        {/* Guardian Message (Duolingo Style) */}
        {user?.probationUntil ? (
          <Card style={[styles.guardianBubble, { borderLeftColor: '#EF4444', backgroundColor: 'rgba(239, 68, 68, 0.05)' }]} padding={16}>
            <Typography variant="body" weight="black" color="#EF4444">
              PROBATION ACTIVE
            </Typography>
            <Typography variant="caption" weight="bold" color="#EF4444">
              XP earnings are halved. Focus to restore your honor.
            </Typography>
          </Card>
        ) : (
          <Card style={styles.guardianBubble} padding={16}>
            <Typography variant="body" weight="semibold" style={{ fontStyle: 'italic' }}>
              "You're {user?.streak} days strong, {user?.name}. Don't let the streak reset today!"
            </Typography>
          </Card>
        )}

        {/* Central Discipline Gauge */}
        <View style={styles.gaugeContainer}>
          <Svg width={GAUGE_SIZE} height={GAUGE_SIZE} style={styles.gauge}>
            <Defs>
              <LinearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor="#8B5CF6" />
                <Stop offset="100%" stopColor="#7C3AED" />
              </LinearGradient>
            </Defs>
            {/* Background Track */}
            <Circle
              cx={GAUGE_SIZE / 2}
              cy={GAUGE_SIZE / 2}
              r={RADIUS}
              stroke={isDark ? '#1E293B' : '#E2E8F0'}
              strokeWidth={STROKE_WIDTH}
              fill="none"
            />
            {/* Progress Track */}
            <AnimatedCircle
              cx={GAUGE_SIZE / 2}
              cy={GAUGE_SIZE / 2}
              r={RADIUS}
              stroke="url(#gaugeGradient)"
              strokeWidth={STROKE_WIDTH}
              fill="none"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${GAUGE_SIZE / 2} ${GAUGE_SIZE / 2})`}
            />
          </Svg>

          <View style={styles.scoreContent}>
            <GuardianBear state="idle" size={120} />
            <View style={[
              styles.statusBadge,
              { backgroundColor: getDisciplineStatusColor(disciplineScore) }
            ]}>
              <Typography variant="label" color="white" weight="black">
                {getDisciplineStatus(disciplineScore)}
              </Typography>
            </View>
            <Typography variant="h1" weight="black" style={{ marginTop: 0, fontSize: 56 }}>
              {disciplineScore}
            </Typography>
            <Typography variant="label" weight="bold" color="#94A3B8">Discipline Score</Typography>

            {/* Daily Goal Duolingo-style */}
            <View style={styles.dailyGoalContainer}>
              <View style={styles.dailyGoalHeader}>
                <Typography variant="label" weight="black" color="#7C3AED" style={{ fontSize: 10 }}>
                  DAILY GOAL: {user?.xp ? (user.xp % user.dailyXPGoal) : 0} / {user?.dailyXPGoal} XP
                </Typography>
              </View>
              <View style={styles.dailyGoalBarBg}>
                <View
                  style={[
                    styles.dailyGoalBarFill,
                    { width: `${Math.min(100, ((user?.xp || 0) % (user?.dailyXPGoal || 50)) / (user?.dailyXPGoal || 50) * 100)}%` }
                  ]}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <Card
            style={styles.statCard}
            padding={16}
            onPress={onViewAchievements}
          >
            <Text style={styles.statEmoji}>🔥</Text>
            <View>
              <Typography variant="body" weight="bold">{user?.streak || 0}</Typography>
              <Typography variant="caption" weight="semibold" color="#64748B">Days Streak</Typography>
            </View>
          </Card>
          <Card
            style={styles.statCard}
            padding={16}
            onPress={onViewXP}
          >
            <Text style={styles.statEmoji}>⭐</Text>
            <View>
              <Typography variant="body" weight="bold">
                {user?.xp ? (user.xp > 1000 ? `${(user.xp / 1000).toFixed(1)}k` : user.xp) : 0}
              </Typography>
              <Typography variant="caption" weight="semibold" color="#64748B">Total XP</Typography>
            </View>
          </Card>
        </View>

        {/* Weekly Progress Section */}
        {!hasData ? (
          <EmptyState
            title="No focus history yet"
            description="Your weekly discipline chart will appear here once you complete your first session."
          />
        ) : (
          <>
            <Card style={styles.progressSection} padding={24}>
              <Typography variant="h3" weight="bold" style={{ marginBottom: 24 }}>Weekly Focus</Typography>
              <View style={styles.barContainer}>
                {barAnims.map((anim, i) => (
                  <View key={i} style={styles.barWrapper}>
                    <Animated.View
                      style={[
                        styles.bar,
                        {
                          height: anim,
                          backgroundColor: i === 3 ? '#7C3AED' : '#C4B5FD'
                        }
                      ]}
                    />
                    <Typography variant="label" style={{ fontSize: 10, marginTop: 8 }} color="#94A3B8">
                      {['M','T','W','T','F','S','S'][i]}
                    </Typography>
                  </View>
                ))}
              </View>
            </Card>

            {/* Mock Leaderboard Preview (Duolingo Style) */}
            <Card style={styles.leaderboardPreview} padding={20}>
              <View style={styles.leaderboardHeader}>
                <Typography variant="h3" weight="black">Bronze League</Typography>
                <Typography variant="caption" weight="bold" color="#7C3AED">View League</Typography>
              </View>
              <View style={styles.leaderboardList}>
                <View style={styles.leaderboardItem}>
                  <View style={[styles.rankCircle, { backgroundColor: '#FFD700' }]}>
                    <Typography variant="label" color="white" weight="black">1</Typography>
                  </View>
                  <Typography variant="body" weight="bold" style={{ flex: 1, marginLeft: 12 }}>Alex R.</Typography>
                  <Typography variant="body" weight="black">2,450 XP</Typography>
                </View>
                <View style={styles.leaderboardItem}>
                  <View style={[styles.rankCircle, { backgroundColor: '#C0C0C0' }]}>
                    <Typography variant="label" color="white" weight="black">2</Typography>
                  </View>
                  <Typography variant="body" weight="bold" style={{ flex: 1, marginLeft: 12 }}>Sarah M.</Typography>
                  <Typography variant="body" weight="black">1,820 XP</Typography>
                </View>
                <View style={[styles.leaderboardItem, styles.currentUserItem]}>
                  <View style={[styles.rankCircle, { backgroundColor: '#7C3AED' }]}>
                    <Typography variant="label" color="white" weight="black">3</Typography>
                  </View>
                  <Typography variant="body" weight="bold" style={{ flex: 1, marginLeft: 12 }}>{user?.name} (You)</Typography>
                  <Typography variant="body" weight="black">{user?.xp} XP</Typography>
                </View>
              </View>
            </Card>
          </>
        )}

        {/* Primary Action Button */}
        <Button
          title="Start Focus Session"
          onPress={onStartSession}
          size="large"
          style={{ marginTop: 8 }}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  greeting: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600',
  },
  name: {
    fontSize: 24,
    fontWeight: '900',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  gemBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  guardianBubble: {
    marginBottom: 32,
    backgroundColor: 'rgba(124, 58, 237, 0.05)',
    borderLeftWidth: 4,
    borderLeftColor: '#7C3AED',
    borderRadius: 16,
  },
  shareIconButton: {
    padding: 8,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderRadius: 12,
  },
  shareIcon: {
    fontSize: 18,
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
  gaugeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  gauge: {
    position: 'absolute',
  },
  scoreContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '900',
    marginTop: -10,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dailyGoalContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  dailyGoalHeader: {
    marginBottom: 8,
  },
  dailyGoalBarBg: {
    width: width * 0.5,
    height: 8,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  dailyGoalBarFill: {
    height: '100%',
    backgroundColor: '#7C3AED',
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statEmoji: {
    fontSize: 24,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  progressSection: {
    padding: 24,
    borderRadius: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  leaderboardPreview: {
    marginBottom: 32,
    backgroundColor: 'rgba(124, 58, 237, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.1)',
  },
  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  leaderboardList: {
    gap: 12,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  currentUserItem: {
    backgroundColor: 'rgba(124, 58, 237, 0.05)',
    paddingHorizontal: 12,
    borderRadius: 12,
    marginHorizontal: -12,
  },
  rankCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 24,
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 100,
  },
  barWrapper: {
    alignItems: 'center',
    gap: 8,
  },
  bar: {
    width: 12,
    borderRadius: 6,
  },
  barDay: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '700',
  },
  actionButton: {
    backgroundColor: '#7C3AED',
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
  },
});
