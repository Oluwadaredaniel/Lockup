import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, getLevelFromXP, calculateDisciplineScore, createInitialProfile, LockLevel } from '../../../../packages/core';
import { NotificationService } from '../services/NotificationService';
import { UserService } from '../services/UserService';
import { XPService } from '../services/XPService';
import { AchievementService } from '../services/AchievementService';
import { useAuth } from '../hooks/useAuth';

interface UserContextType {
  user: UserProfile | null;
  addXP: (amount: number, reason?: string) => void;
  completeSession: (amount: number) => void;
  failSession: (lockLevel: LockLevel) => void;
  triggerOverride: () => void;
  updateSettings: (settings: Partial<UserProfile>) => void;
  unlockAchievement: (id: string) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = UserService.subscribeToProfile(authUser.uid, (profile) => {
      setUser(profile);
      setLoading(false);
      checkStreak(profile);
    });

    return unsubscribe;
  }, [authUser]);

  useEffect(() => {
    if (authUser && !user && !loading) {
      UserService.getUserProfile(authUser.uid).then(profile => {
        if (!profile) {
          const initialProfile = createInitialProfile(authUser.uid, authUser.email?.split('@')[0] || 'Guardian');
          UserService.createUserProfile(initialProfile);
        }
      });
    }
  }, [authUser, user, loading]);

  const checkStreak = (currentUser: UserProfile) => {
    if (!currentUser.lastActive) return;
    const lastActive = new Date(currentUser.lastActive);
    const today = new Date();

    if (currentUser.probationUntil && new Date(currentUser.probationUntil) <= today) {
      UserService.updateProfile(currentUser.uid, { probationUntil: undefined });
    }

    const diffTime = Math.abs(today.getTime() - lastActive.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 1) {
      if (diffDays >= 2) {
        if (currentUser.streakShields > 0) {
          UserService.updateProfile(currentUser.uid, {
            streakShields: currentUser.streakShields - 1,
            lastActive: new Date()
          });
          NotificationService.sendInstantNotification("Streak Shield Used! 🛡️", "Guardian protected your streak.");
        } else {
          UserService.updateProfile(currentUser.uid, { streak: 0 });
          NotificationService.sendInstantNotification("Streak Broken ❄️", "Consistency is the path to growth. Start again.");
        }
      } else {
        NotificationService.sendInstantNotification("Streak at Risk! 🔥", "Focus now to protect your streak.");
      }
    }
  };

  const addXP = (amount: number, reason: string = 'General Activity') => {
    if (!user) return;
    const finalAmount = user.probationUntil ? Math.floor(amount / 2) : amount;
    const newXP = Math.max(0, user.xp + finalAmount);

    UserService.updateProfile(user.uid, {
      xp: newXP,
      level: getLevelFromXP(newXP),
    });

    XPService.logTransaction({ userId: user.uid, amount: finalAmount, reason, createdAt: new Date() });
  };

  const unlockAchievement = (id: string) => {
    if (!user) return;
    const achievement = user.achievements.find(a => a.id === id);
    if (!achievement || achievement.unlocked) return;

    UserService.updateProfile(user.uid, {
      achievements: user.achievements.map(a =>
        a.id === id ? { ...a, unlocked: true, date: new Date().toLocaleDateString() } : a
      ),
      gems: user.gems + 50,
    });
  };

  const completeSession = (amount: number) => {
    if (!user) return;
    const finalXP = user.probationUntil ? Math.floor(amount / 2) : amount;
    const newXP = user.xp + finalXP;
    const newCompleted = user.completedSessions + 1;

    const lastActiveDate = user.lastActive ? new Date(user.lastActive) : new Date(0);
    const isNewDay = new Date().toDateString() !== lastActiveDate.toDateString();
    const newStreak = user.probationUntil ? user.streak : (isNewDay ? user.streak + 1 : user.streak);

    const newScore = calculateDisciplineScore(newCompleted, user.failedSessions, newStreak);
    const todayIndex = (new Date().getDay() + 6) % 7;
    const newActivity = [...user.weeklyActivity];
    newActivity[todayIndex] = Math.min(100, newActivity[todayIndex] + 10);

    UserService.updateProfile(user.uid, {
      xp: newXP,
      level: getLevelFromXP(newXP),
      completedSessions: newCompleted,
      disciplineScore: newScore,
      streak: newStreak,
      weeklyActivity: newActivity,
      lastActive: new Date(),
      gems: user.gems + 10,
    });

    XPService.logTransaction({ userId: user.uid, amount: finalXP, reason: 'Focus Session Completed', createdAt: new Date() });
    AchievementService.checkAchievements({ ...user, xp: newXP, completedSessions: newCompleted, disciplineScore: newScore, streak: newStreak });
  };

  const failSession = (lockLevel: LockLevel) => {
    if (!user) return;
    let xpPenalty = lockLevel === LockLevel.Commitment ? 20 : (lockLevel === LockLevel.Strict ? 100 : 0);
    const newXP = Math.max(0, user.xp - xpPenalty);
    const newFailed = user.failedSessions + 1;
    const streakReset = lockLevel === LockLevel.Strict;
    const newStreak = streakReset ? 0 : user.streak;

    UserService.updateProfile(user.uid, {
      xp: newXP,
      failedSessions: newFailed,
      disciplineScore: calculateDisciplineScore(user.completedSessions, newFailed, newStreak),
      streak: newStreak,
      lastActive: new Date(),
    });

    if (xpPenalty > 0) {
      XPService.logTransaction({
        userId: user.uid,
        amount: -xpPenalty,
        reason: streakReset ? 'Strict Session Failed' : 'Commitment Session Abandoned',
        createdAt: new Date()
      });
    }
  };

  const triggerOverride = () => {
    if (!user) return;
    const probationUntil = new Date();
    probationUntil.setDate(probationUntil.getDate() + 3);

    UserService.updateProfile(user.uid, {
      xp: Math.max(0, user.xp - 150),
      failedSessions: user.failedSessions + 1,
      disciplineScore: calculateDisciplineScore(user.completedSessions, user.failedSessions + 1, 0),
      streak: 0,
      probationUntil,
      lastActive: new Date(),
    });

    XPService.logTransaction({ userId: user.uid, amount: -150, reason: 'Emergency Override', createdAt: new Date() });
  };

  const updateSettings = (settings: Partial<UserProfile>) => {
    if (user) UserService.updateProfile(user.uid, settings);
  };

  return (
    <UserContext.Provider value={{ user, addXP, completeSession, failSession, triggerOverride, updateSettings, unlockAchievement, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error('useUser must be used within a UserProvider');
  return context;
};
