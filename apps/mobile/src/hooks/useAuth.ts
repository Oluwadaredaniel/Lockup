import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated auth state check
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUser({ uid: '123', email });
    setLoading(false);
  };

  const signup = async (email: string, pass: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUser({ uid: '123', email });
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return { user, loading, login, signup, logout };
};
