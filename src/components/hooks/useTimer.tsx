import { useState, useEffect } from 'react';
// Types
import { UseTimerProps, UseTimerReturn } from '../types/types';
//#endregion

export const useTimer = ({ initialTime, gameStarted, onTimeEnd }: UseTimerProps): UseTimerReturn => {
  const [currentTime, setCurrentTime] = useState<number>(initialTime);

  useEffect(() => {
    setCurrentTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
      setCurrentTime((prevTime) => {
        const newTime = prevTime - 1;
        
        if (newTime === 0) {
          clearInterval(timer);
          onTimeEnd?.();
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, onTimeEnd]);

  const setTime = (time: number) => {
    setCurrentTime(time);
  };

  const resetTimer = () => {
    setCurrentTime(initialTime);
  };

  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const formattedTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  return {
    currentTime,
    formattedTime,
    setTime,
    resetTimer
  };
};
