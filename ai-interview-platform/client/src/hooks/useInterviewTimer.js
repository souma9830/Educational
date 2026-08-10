import { useState, useEffect, useRef, useCallback } from 'react';

export function useInterviewTimer(initialSeconds = 1800, onTimeUp) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    let intervalId = null;

    if (isActive && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            setIsActive(false);
            if (onTimeUpRef.current) onTimeUpRef.current();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive, timeLeft]);

  const startTimer = useCallback(() => setIsActive(true), []);
  const pauseTimer = useCallback(() => setIsActive(false), []);
  const resetTimer = useCallback((newTime = initialSeconds) => {
    setIsActive(false);
    setTimeLeft(newTime);
  }, [initialSeconds]);

  return { timeLeft, isActive, startTimer, pauseTimer, resetTimer };
}
