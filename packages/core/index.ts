/**
 * LockUp Core Logic
 * This package is shared between the Mobile App and the Chrome Extension.
 */

export * from './types';
export * from './theme';
export * from './firebase.config';
export * from './sessions';
export * from './streaks';
export * from './users';

export interface Achievement {
  id: string;
  title: string;
  emoji: string;
  unlocked: boolean;
  date?: string;
  requirement: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  xp: number;
  level: number;
  disciplineScore: number; // 0 - 1000
  streak: number;
  lastActive: Date;
  completedSessions: number;
  failedSessions: number;
  weeklyActivity: number[];
  dailyXPGoal: number;
  notificationsEnabled: boolean;
  achievements: Achievement[];
  gems: number; // Currency for shop
  probationUntil?: Date; // For Discipline Probation
  defaultBlocklist?: string[]; // Custom set of blocked apps
  league?: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'ELITE';
}

/**
 * Returns the league based on discipline score and XP.
 */
export const calculateLeague = (score: number, xp: number): string => {
  if (score >= 900 && xp >= 5000) return 'ELITE';
  if (score >= 800 && xp >= 3000) return 'PLATINUM';
  if (score >= 650 && xp >= 1500) return 'GOLD';
  if (score >= 400 && xp >= 500) return 'SILVER';
  return 'BRONZE';
};

/**
 * Calculates the discipline score based on session completion and streaks.
 * Now using a weighted logic as per PRD V2.
 */
export const calculateDisciplineScore = (
  completedSessions: number,
  failedSessions: number,
  streakDays: number
): number => {
  const total = completedSessions + failedSessions;
  if (total === 0) return 500; // Neutral start

  // Base completion rate (0-600 points)
  const completionRate = completedSessions / total;
  const baseScore = completionRate * 600;

  // Streak consistency (0-300 points)
  // Reaching a 30-day streak maxes this out
  const streakBonus = Math.min((streakDays / 30) * 300, 300);

  // Volume / Intensity (0-100 points)
  const volumeBonus = Math.min((completedSessions / 100) * 100, 100);

  return Math.min(Math.round(baseScore + streakBonus + volumeBonus), 1000);
};

/**
 * Returns a human-readable status for the discipline score
 */
export const getDisciplineStatus = (score: number): string => {
  if (score >= 900) return 'ELITE';
  if (score >= 750) return 'UNSTOPPABLE';
  if (score >= 500) return 'CONSISTENT';
  if (score >= 250) return 'STRUGGLING';
  return 'DISRUPTED';
};

/**
 * Returns the color for the discipline status
 */
export const getDisciplineStatusColor = (score: number): string => {
  if (score >= 900) return '#7C3AED'; // Plum
  if (score >= 750) return '#10B981'; // Success Green
  if (score >= 500) return '#3B82F6'; // Info Blue
  if (score >= 250) return '#F59E0B'; // Warning Orange
  return '#EF4444'; // Error Red
};

export const XP_PER_LEVEL = 500;

export const getLevelFromXP = (xp: number): number => {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
};
