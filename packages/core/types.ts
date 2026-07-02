export enum LockLevel {
  Flexible = 1,
  Commitment = 2,
  Strict = 3,
}

export enum SessionStatus {
  Created = 'created',
  Active = 'active',
  Completed = 'completed',
  Failed = 'failed',
  Abandoned = 'abandoned',
}

export interface FocusSession {
  id: string;
  userId: string;
  name: string;
  duration: number; // in minutes
  lockLevel: LockLevel;
  status: SessionStatus;
  startedAt?: Date;
  endedAt?: Date;
  blockedApps: string[];
}

export interface XPTransaction {
  id: string;
  userId: string;
  amount: number;
  reason: string;
  createdAt: Date;
}

export interface Streak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: Date;
  shieldCount: number;
}
