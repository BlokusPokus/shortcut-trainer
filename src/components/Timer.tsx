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
    console.log('delayResend changed:', delayResend);
    setDelay(delayResend);
  }, [delayResend]);

  useEffect(() => {
    console.log('Timer effect - gameStarted:', gameStarted, 'delay:', delay, 'delayResend:', delayResend);
    if(!gameStarted) return;

    const timer = setInterval(() => {
      setDelay((prevDelay) => {
        const newDelay = prevDelay - 1;
        console.log('Timer tick - newDelay:', newDelay);
        // Notify parent component of time change
        if (onTimeUpdate) {
          onTimeUpdate(newDelay);
        }
        return newDelay;
      });
    }, 1000);

    if (delay === 0) {
      console.log('Timer reached 0 - resetting');
      clearInterval(timer);
      setGameStarted(false);
      setDelay(delayResend);
      if (onTimeUpdate) {
        console.log('Updating parent with delayResend:', delayResend);
        onTimeUpdate(delayResend);
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [delay, gameStarted, setGameStarted, onTimeUpdate, delayResend]);

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
