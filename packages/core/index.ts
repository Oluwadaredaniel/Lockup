/**
 * LockUp Core Logic
 * This package is shared between the Mobile App and the Chrome Extension.
 */

export * from './types';
export * from './theme';
export * from './firebase.config';

export interface UserProfile {
  uid: string;
  name: string;
  xp: number;
  level: number;
  disciplineScore: number; // 0 - 1000
  streak: number;
  lastActive: Date;
}

/**
 * Calculates the discipline score based on session completion and streaks.
 */
export const calculateDisciplineScore = (
  completedSessions: number,
  failedSessions: number,
  streakDays: number
): number => {
  const total = completedSessions + failedSessions;
  if (total === 0) return 0;

  const baseScore = (completedSessions / total) * 800;
  const streakBonus = Math.min(streakDays * 10, 200);

  return Math.min(Math.round(baseScore + streakBonus), 1000);
};

export const XP_PER_LEVEL = 500;

export const getLevelFromXP = (xp: number): number => {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
};
