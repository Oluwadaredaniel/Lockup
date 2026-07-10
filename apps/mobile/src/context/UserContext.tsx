import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, getLevelFromXP, calculateDisciplineScore } from '../../../../packages/core';
import { NotificationService } from '../services/NotificationService';

interface UserContextType {
  user: UserProfile | null;
  addXP: (amount: number) => void;
  completeSession: (xp: number) => void;
  failSession: () => void;
  updateSettings: (settings: Partial<UserProfile>) => void;
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
    };
    setUser(mockUser);
    setLoading(false);

    // Request Notifications
    NotificationService.registerForPushNotificationsAsync().then(token => {
      if (token) console.log('Push Token:', token);
    });
  }, []);

  const addXP = (amount: number) => {
    setUser(prev => {
      if (!prev) return null;
      const newXP = prev.xp + amount;

      // Goal Check
      if (prev.xp % prev.dailyXPGoal + amount >= prev.dailyXPGoal) {
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

  const completeSession = (amount: number) => {
    setUser(prev => {
      if (!prev) return null;
      const newXP = prev.xp + amount;
      const newCompleted = prev.completedSessions + 1;
      const newScore = calculateDisciplineScore(newCompleted, prev.failedSessions, prev.streak);

      const todayIndex = (new Date().getDay() + 6) % 7; // Mon is 0
      const newActivity = [...prev.weeklyActivity];
      newActivity[todayIndex] = Math.min(100, newActivity[todayIndex] + 10);

      // Goal Check
      if (prev.xp % prev.dailyXPGoal + amount >= prev.dailyXPGoal) {
        NotificationService.sendInstantNotification(
          "Goal Reached! 🚀",
          "Daily discipline target locked in."
        );
      }

      return {
        ...prev,
        xp: newXP,
        level: getLevelFromXP(newXP),
        completedSessions: newCompleted,
        disciplineScore: newScore,
        weeklyActivity: newActivity,
        lastActive: new Date(),
      };
    });
  };

  const failSession = () => {
    setUser(prev => {
      if (!prev) return null;
      const newFailed = prev.failedSessions + 1;
      const newScore = calculateDisciplineScore(prev.completedSessions, newFailed, prev.streak);

      NotificationService.sendInstantNotification(
        "Session Failed 🚨",
        "The Guardian Bear is disappointed. Try again when you're ready."
      );

      return {
        ...prev,
        failedSessions: newFailed,
        disciplineScore: newScore,
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
    <UserContext.Provider value={{ user, addXP, completeSession, failSession, updateSettings, loading }}>
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
