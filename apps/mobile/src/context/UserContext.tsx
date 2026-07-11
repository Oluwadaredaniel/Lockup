import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, getLevelFromXP, calculateDisciplineScore, DEFAULT_ACHIEVEMENTS } from '../../../../packages/core';
import { NotificationService } from '../services/NotificationService';

interface UserContextType {
  user: UserProfile | null;
  addXP: (amount: number) => void;
  completeSession: (amount: number) => void;
  failSession: (lockLevel: LockLevel) => void;
  triggerOverride: () => void;
  updateSettings: (settings: Partial<UserProfile>) => void;
  unlockAchievement: (id: string) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initializing mock user for now
    const mockUser: UserProfile = {
      uid: '123',
      name: 'Daniel',
      xp: 1250,
      level: getLevelFromXP(1250),
      disciplineScore: 850,
      streak: 5,
      lastActive: new Date(),
      completedSessions: 12,
      failedSessions: 2,
      weeklyActivity: [40, 70, 45, 90, 65, 30, 80],
      dailyXPGoal: 50,
      notificationsEnabled: true,
      achievements: [
        { ...DEFAULT_ACHIEVEMENTS[0], unlocked: true, date: 'Oct 12' },
        { ...DEFAULT_ACHIEVEMENTS[1], unlocked: true, date: 'Oct 19' },
        { ...DEFAULT_ACHIEVEMENTS[2], unlocked: true, date: 'Oct 20' },
        ...DEFAULT_ACHIEVEMENTS.slice(3)
      ],
      gems: 450,
    };
    setUser(mockUser);
    setLoading(false);

    // Request Notifications
    NotificationService.registerForPushNotificationsAsync().then(token => {
      if (token) console.log('Push Token:', token);
    });

    checkStreak(mockUser);
  }, []);

  const checkStreak = (currentUser: UserProfile) => {
    const lastActive = new Date(currentUser.lastActive);
    const today = new Date();

    // Check if probation has ended
    if (currentUser.probationUntil && new Date(currentUser.probationUntil) <= today) {
      setUser(prev => prev ? { ...prev, probationUntil: undefined } : null);
    }

    const diffTime = Math.abs(today.getTime() - lastActive.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      // Streak at risk!
      NotificationService.sendInstantNotification(
        "Streak at Risk! 🔥",
        "Your streak is about to break. Complete a session now to save it!"
      );

      if (diffDays > 2) {
        // Streak broken
        setUser(prev => prev ? { ...prev, streak: 0 } : null);
        NotificationService.sendInstantNotification(
          "Streak Broken ❄️",
          "You missed a few days and your streak has reset. The Guardian Bear is waiting for you to start fresh."
        );
      }
    }
  };

  const addXP = (amount: number) => {
    setUser(prev => {
      if (!prev) return null;

      // Halve XP if on probation
      const finalAmount = prev.probationUntil ? Math.floor(amount / 2) : amount;
      const newXP = Math.max(0, prev.xp + finalAmount);

      // Goal Check
      if (prev.xp % prev.dailyXPGoal + finalAmount >= prev.dailyXPGoal) {
        NotificationService.sendInstantNotification(
          "Goal Achieved! 🏆",
          "You've hit your daily focus goal. The Guardian Bear is proud."
        );
      }

      return {
        ...prev,
        xp: newXP,
        level: getLevelFromXP(newXP),
      };
    });
  };

  const unlockAchievement = (id: string) => {
    setUser(prev => {
      if (!prev) return null;
      const isAlreadyUnlocked = prev.achievements.find(a => a.id === id)?.unlocked;
      if (isAlreadyUnlocked) return prev;

      NotificationService.sendInstantNotification(
        "Achievement Unlocked! 🏅",
        `Congratulations! You've earned: ${prev.achievements.find(a => a.id === id)?.title}`
      );

      return {
        ...prev,
        achievements: prev.achievements.map(a =>
          a.id === id ? { ...a, unlocked: true, date: new Date().toLocaleDateString() } : a
        ),
        gems: prev.gems + 50, // Reward for achievement
      };
    });
  };

  const completeSession = (amount: number) => {
    setUser(prev => {
      if (!prev) return null;

      const finalXP = prev.probationUntil ? Math.floor(amount / 2) : amount;
      const newXP = prev.xp + finalXP;
      const newCompleted = prev.completedSessions + 1;

      // If on probation, streak doesn't increase
      const newStreak = prev.probationUntil ? prev.streak : prev.streak + 1;

      const newScore = calculateDisciplineScore(newCompleted, prev.failedSessions, newStreak);

      const todayIndex = (new Date().getDay() + 6) % 7; // Mon is 0
      const newActivity = [...prev.weeklyActivity];
      newActivity[todayIndex] = Math.min(100, newActivity[todayIndex] + 10);

      // Achievement check: First session
      if (newCompleted === 1) {
        setTimeout(() => unlockAchievement('1'), 500);
      }

      return {
        ...prev,
        xp: newXP,
        level: getLevelFromXP(newXP),
        completedSessions: newCompleted,
        disciplineScore: newScore,
        streak: newStreak,
        weeklyActivity: newActivity,
        lastActive: new Date(),
      };
    });
  };

  const failSession = (lockLevel: LockLevel) => {
    setUser(prev => {
      if (!prev) return null;

      let xpPenalty = 0;
      let streakReset = false;

      if (lockLevel === LockLevel.Commitment) {
        xpPenalty = 20;
      } else if (lockLevel === LockLevel.Strict) {
        xpPenalty = 100;
        streakReset = true;
      }

      const newXP = Math.max(0, prev.xp - xpPenalty);
      const newFailed = prev.failedSessions + 1;
      const newStreak = streakReset ? 0 : prev.streak;
      const newScore = calculateDisciplineScore(prev.completedSessions, newFailed, newStreak);

      NotificationService.sendInstantNotification(
        "Session Failed 🚨",
        streakReset ? "Streak Reset. Discipline probation active." : "The Guardian Bear is disappointed."
      );

      return {
        ...prev,
        xp: newXP,
        failedSessions: newFailed,
        disciplineScore: newScore,
        streak: newStreak,
        lastActive: new Date(),
      };
    });
  };

  const triggerOverride = () => {
    setUser(prev => {
      if (!prev) return null;

      const xpPenalty = 150;
      const probationDays = 3;
      const probationUntil = new Date();
      probationUntil.setDate(probationUntil.getDate() + probationDays);

      const newXP = Math.max(0, prev.xp - xpPenalty);
      const newFailed = prev.failedSessions + 1;
      const newScore = calculateDisciplineScore(prev.completedSessions, newFailed, 0);

      NotificationService.sendInstantNotification(
        "Emergency Override Triggered ⚠️",
        "-150 XP and 3-day Discipline Probation active."
      );

      return {
        ...prev,
        xp: newXP,
        failedSessions: newFailed,
        disciplineScore: newScore,
        streak: 0,
        probationUntil,
        lastActive: new Date(),
      };
    });
  };

  const updateSettings = (settings: Partial<UserProfile>) => {
    setUser(prev => {
      if (!prev) return null;
      return { ...prev, ...settings };
    });
  };

  return (
    <UserContext.Provider value={{ user, addXP, completeSession, failSession, triggerOverride, updateSettings, unlockAchievement, loading }}>
      {children}
    </UserContext.Provider>
  );
};

  return (
    <UserContext.Provider value={{ user, addXP, completeSession, failSession, updateSettings, unlockAchievement, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
