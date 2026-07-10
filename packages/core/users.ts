import { UserProfile } from './index';

export const DEFAULT_ACHIEVEMENTS = [
  { id: '1', title: 'First Session', emoji: '🎯', unlocked: false, requirement: 'complete_1_session' },
  { id: '2', title: '7 Day Streak', emoji: '🔥', unlocked: false, requirement: 'streak_7' },
  { id: '3', title: 'Deep Work Master', emoji: '🧠', unlocked: false, requirement: 'focus_10_hours' },
  { id: '4', title: 'Early Bird', emoji: '🌅', unlocked: false, requirement: 'focus_before_8am' },
  { id: '5', title: '30 Day Streak', emoji: '👑', unlocked: false, requirement: 'streak_30' },
  { id: '6', title: 'Distraction Slayer', emoji: '⚔️', unlocked: false, requirement: 'block_50_distractions' },
  { id: '7', title: '100 Focus Hours', emoji: '⏳', unlocked: false, requirement: 'focus_100_hours' },
  { id: '8', title: 'Elite Discipline', emoji: '💎', unlocked: false, requirement: 'score_900' },
];

/**
 * Creates a new user profile with default values.
 */
export const createInitialProfile = (uid: string, name: string): UserProfile => ({
  uid,
  name,
  xp: 0,
  level: 1,
  disciplineScore: 500, // Start neutral
  streak: 0,
  lastActive: new Date(),
  completedSessions: 0,
  failedSessions: 0,
  weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
  dailyXPGoal: 50,
  notificationsEnabled: true,
  achievements: DEFAULT_ACHIEVEMENTS,
  gems: 100,
});

/**
 * Validates a user profile object.
 */
export const isValidProfile = (profile: any): profile is UserProfile => {
  return (
    typeof profile?.uid === 'string' &&
    typeof profile?.name === 'string' &&
    typeof profile?.xp === 'number' &&
    typeof profile?.level === 'number'
  );
};
