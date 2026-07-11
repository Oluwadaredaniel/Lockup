import { LockLevel, SessionStatus } from './types';

export const BASE_XP_PER_SESSION = 20;

/**
 * Calculates XP earned based on duration and difficulty (Lock Level).
 */
export const calculateSessionXP = (
  durationMinutes: number,
  lockLevel: LockLevel,
  status: SessionStatus
): number => {
  if (status !== SessionStatus.Completed) return 0;

  let multiplier = 1;
  if (lockLevel === LockLevel.Commitment) multiplier = 1.5;
  if (lockLevel === LockLevel.Strict) multiplier = 2.0;

  // Bonus for longer sessions (every 30 mins adds a +10 XP bonus)
  const durationBonus = Math.floor(durationMinutes / 30) * 10;

  return Math.round((BASE_XP_PER_SESSION + durationBonus) * multiplier);
};

/**
 * Formats seconds into a high-precision string (MM:SS or HH:MM:SS)
 */
export const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const parts = [
    m.toString().padStart(2, '0'),
    s.toString().padStart(2, '0'),
  ];

  if (h > 0) {
    parts.unshift(h.toString().padStart(2, '0'));
  }

  return parts.join(':');
};
