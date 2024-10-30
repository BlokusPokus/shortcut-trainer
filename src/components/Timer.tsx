import React from "react";
import { useTimer } from './hooks/useTimer';

interface TimerProps {
  delayResend: number;
  gameStarted: boolean;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  onTimeUpdate?: (remainingTime: number) => void;
}

const Timer = ({ delayResend, gameStarted, setGameStarted, onTimeUpdate }: TimerProps) => {
  const { formattedTime } = useTimer({
    initialTime: delayResend,
    gameStarted,
    onTimeEnd: () => {
      setGameStarted(false);
      onTimeUpdate?.(delayResend);
    }
  });

  return <span>{formattedTime}</span>;
};

export default Timer;
