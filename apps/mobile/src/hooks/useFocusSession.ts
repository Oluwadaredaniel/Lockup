import { useState, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { SessionStatus } from '../../../../packages/core';

export const useFocusSession = (initialDurationMinutes: number) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialDurationMinutes * 60);
  const [status, setStatus] = useState<SessionStatus>(SessionStatus.Active);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTimestamp = useRef(Date.now());

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && status === SessionStatus.Active) {
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - lastTimestamp.current) / 1000);
        setSecondsRemaining(prev => Math.max(0, prev - elapsedSeconds));
      }
      lastTimestamp.current = Date.now();
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [status]);

  useEffect(() => {
    if (status === SessionStatus.Active && secondsRemaining > 0) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
        lastTimestamp.current = Date.now();
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    if (secondsRemaining <= 0 && status === SessionStatus.Active) {
      setStatus(SessionStatus.Completed);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, secondsRemaining]);

  const abandon = () => {
    setStatus(SessionStatus.Abandoned);
  };

  const complete = () => {
    setStatus(SessionStatus.Completed);
  };

  return {
    secondsRemaining,
    status,
    abandon,
    complete,
  };
};
