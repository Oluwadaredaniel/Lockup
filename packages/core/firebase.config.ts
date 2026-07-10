/**
 * Firebase Configuration Logic
 * Environment variables should be provided by the consuming app (Mobile/Web).
 */

export const getFirebaseConfig = (env: Record<string, string>) => ({
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID,
});

export enum Collections {
  Users = 'users',
  Sessions = 'sessions',
  XPTransactions = 'xp_transactions',
  Streaks = 'streaks',
  Achievements = 'achievements',
  GlobalStats = 'global_stats',
}

export const STORAGE_KEYS = {
  USER_PROFILE: '@lockup_user_profile',
  ACTIVE_SESSION: '@lockup_active_session',
  THEME: '@lockup_theme',
};
