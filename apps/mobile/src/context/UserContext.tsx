import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, getLevelFromXP, calculateDisciplineScore } from '../../../../packages/core';

interface UserContextType {
  user: UserProfile | null;
  addXP: (amount: number) => void;
  completeSession: (xp: number) => void;
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
    };
    setUser(mockUser);
    setLoading(false);
  }, []);

  const addXP = (amount: number) => {
    setUser(prev => {
      if (!prev) return null;
      const newXP = prev.xp + amount;
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
      return {
        ...prev,
        xp: newXP,
        level: getLevelFromXP(newXP),
        completedSessions: newCompleted,
        disciplineScore: newScore,
        lastActive: new Date(),
      };
    });
  };

  return (
    <UserContext.Provider value={{ user, addXP, completeSession, loading }}>
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
