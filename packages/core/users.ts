import { UserProfile } from './index';

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
