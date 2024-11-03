//#region Imports and Third-party Libraries
import React from "react";
// Hooks and Context
import { useTimer } from './hooks/useTimer';
// Styles

// Types
import { TimerProps } from './types/types';
//#endregion


const Timer = ({ delayResend, gameStarted, setGameStarted, onTimeUpdate }: TimerProps) => {
  const { formattedTime } = useTimer({
    initialTime: delayResend,
    gameStarted,
    setGameStarted,
    onTimeEnd: () => {
      setGameStarted(false);
      onTimeUpdate?.(delayResend);
    }
  });

  return (
    <div className="timer-container">
      <span>{delayResend === Infinity ? '' : formattedTime}</span>
    </div>
  );
};

export default Timer;
