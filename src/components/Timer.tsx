import React, { useState, useEffect } from "react";

interface TimerProps {
    delayResend: number; // Changed from string to number
    gameStarted: boolean;
    setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
    // Add ability to update time
    onTimeUpdate?: (remainingTime: number) => void;
}

const Timer = ({ delayResend = 180, gameStarted, setGameStarted, onTimeUpdate }: TimerProps) => {
  const [delay, setDelay] = useState(delayResend);

  // Reset timer when delayResend changes
  useEffect(() => {
    setDelay(delayResend);
  }, [delayResend]);

  useEffect(() => {
    if(!gameStarted) return;

    const timer = setInterval(() => {
      setDelay((prevDelay) => {
        // Notify parent component of time change
        if (onTimeUpdate) {
          onTimeUpdate(prevDelay - 1);
        }
        return prevDelay - 1;
      });
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
      setGameStarted(false);
    }

    return () => {
      clearInterval(timer);
    };
  }, [delay, gameStarted, setGameStarted, onTimeUpdate]);

  // Format seconds with leading zero
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <>
      <span>
        {minutes}:{formattedSeconds}
      </span>
    </>
  );
};

export default Timer;
