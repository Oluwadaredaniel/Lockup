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
import { EmptyState } from '../components/feedback/EmptyState';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

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
}

export const DashboardScreen: React.FC<Props> = ({
  onStartSession,
  onShare,
  onViewAchievements,
  onViewXP,
  onViewProfile
}) => {
  const { theme } = useTheme();
  const { user } = useUser();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const gaugeAnim = useRef(new Animated.Value(0)).current;

  const hasData = !!user;
  const disciplineScore = user?.disciplineScore || 0;
  const progress = disciplineScore / 1000;

  const barAnims = useRef([40, 70, 45, 90, 65, 30, 80].map(() => new Animated.Value(0))).current;

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
          toValue: [40, 70, 45, 90, 65, 30, 80][i],
          duration: 1000,
          easing: Easing.out(Easing.exp),
          useNativeDriver: false, // height cannot be animated with native driver
        })
      ))
    ]).start();
  }, []);

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
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={[styles.name, { color: textColor }]}>{user?.name || 'Guardian'}</Text>
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={onShare} style={styles.shareIconButton}>
              <Text style={styles.shareIcon}>🔗</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.levelBadge, { backgroundColor: '#7C3AED' }]}>
              <Text style={styles.levelText}>Level {user?.level || 1}</Text>
            </TouchableOpacity>
          </View>
        </View>

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
            <Text style={[styles.scoreValue, { color: textColor }]}>{disciplineScore}</Text>
            <Text style={styles.scoreLabel}>Discipline Score</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <TouchableOpacity
            style={[styles.statCard, { backgroundColor: cardColor }]}
            onPress={onViewAchievements}
          >
            <Text style={styles.statEmoji}>🔥</Text>
            <View>
              <Text style={[styles.statValue, { color: textColor }]}>{user?.streak || 0}</Text>
              <Text style={styles.statLabel}>Days Streak</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statCard, { backgroundColor: cardColor }]}
            onPress={onViewXP}
          >
            <Text style={styles.statEmoji}>⭐</Text>
            <View>
              <Text style={[styles.statValue, { color: textColor }]}>
                {user?.xp ? (user.xp > 1000 ? `${(user.xp / 1000).toFixed(1)}k` : user.xp) : 0}
              </Text>
              <Text style={styles.statLabel}>Total XP</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Weekly Progress Placeholder */}
        {!hasData ? (
          <EmptyState
            title="No focus history yet"
            description="Your weekly discipline chart will appear here once you complete your first session."
          />
        ) : (
          <View style={[styles.progressSection, { backgroundColor: cardColor }]}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>Weekly Focus</Text>
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
                  <Text style={styles.barDay}>{['M','T','W','T','F','S','S'][i]}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Primary Action Button */}
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.9}
          onPress={onStartSession}
        >
          <Text style={styles.actionButtonText}>Start Focus Session</Text>
        </TouchableOpacity>

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
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
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
