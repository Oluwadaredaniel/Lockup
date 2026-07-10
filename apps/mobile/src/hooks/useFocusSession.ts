import { useState, useEffect, useRef } from 'react';
import { SessionStatus } from '../../../../packages/core';

export const useFocusSession = (initialDurationMinutes: number) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialDurationMinutes * 60);
  const [status, setStatus] = useState<SessionStatus>(SessionStatus.Active);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (status === SessionStatus.Active && secondsRemaining > 0) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
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
