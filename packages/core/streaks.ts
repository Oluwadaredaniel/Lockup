import { Streak } from './types';

/**
 * Checks if a streak should be reset based on the last active date.
 */
export const shouldResetStreak = (
  lastActiveDate: Date,
  currentDate: Date = new Date()
): boolean => {
  const diffTime = Math.abs(currentDate.getTime() - lastActiveDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // If more than 1 day has passed, the streak is broken
  return diffDays > 1;
};

/**
 * Calculates the next streak state.
 */
export const updateStreak = (
  currentStreak: Streak,
  sessionCompleted: boolean
): Streak => {
  const now = new Date();
  const isBroken = shouldResetStreak(currentStreak.lastActiveDate, now);

  if (!sessionCompleted) {
    if (isBroken && currentStreak.shieldCount > 0) {
      return {
        ...currentStreak,
        shieldCount: currentStreak.shieldCount - 1,
        lastActiveDate: now,
      };
    } else if (isBroken) {
      return {
        ...currentStreak,
        currentStreak: 0,
      };
    }
    return currentStreak;
  }

  // Session completed
  const newCurrent = isBroken ? 1 : currentStreak.currentStreak + 1;
  return {
    ...currentStreak,
    currentStreak: newCurrent,
    longestStreak: Math.max(newCurrent, currentStreak.longestStreak),
    lastActiveDate: now,
  };
};
