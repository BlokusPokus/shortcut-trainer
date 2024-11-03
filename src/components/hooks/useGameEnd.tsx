//#region Imports
import { useEffect } from 'react';
import { UseGameEndProps } from '../types/types';
//#endregion

export const useGameEnd = ({
  inputHistory,
  shortcutList,
  gameStarted,
  setGameStarted,
}: UseGameEndProps) => {
  useEffect(() => {
    if (!gameStarted) return;
    
    const completedOrSkipped = inputHistory.length;
    if (completedOrSkipped === shortcutList.length && completedOrSkipped > 0) {
      setGameStarted(false);
    }
  }, [inputHistory, shortcutList, setGameStarted, gameStarted]);
};