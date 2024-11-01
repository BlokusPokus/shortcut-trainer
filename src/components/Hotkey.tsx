import React, { useReducer, useEffect } from 'react';
import { useHotkeyLogic } from './hooks/useHotkeyLogic';
import { FlipCard } from './FlipCard';
import Timer from './Timer';
import { Instructions } from './Instructions';
import { HotkeyProps } from './types/types';
import './styles/Hotkey.css';
import { listNameReducer } from './utils/utils';

const Hotkey: React.FC<HotkeyProps> = ({
  gameStarted,
  currentShortcutIndex,
  setCurrentShortcutIndex,
  inputHistory,
  setInputHistory,
  shortcutList,
  setGameStarted,
  initialTime,
  setInitialTime,
  setShortcutList,
}) => {
  const currentShortcut = shortcutList[currentShortcutIndex];
  const [listName, dispatch] = useReducer(listNameReducer, 'Custom Shortcuts');
  
  useEffect(() => {
    dispatch({ 
      type: 'SET_LIST_NAME', 
      payload: {
        shortcuts: shortcutList,
        listId: shortcutList[0]?.listId || 'CUSTOM'
      }
    });
  }, [shortcutList]);

  useHotkeyLogic({
    gameStarted,
    currentShortcutIndex,
    setCurrentShortcutIndex,
    setInputHistory,
    shortcutList,
    setShortcutList,
  });

  return (
    <div className="Hotkey-container">
      {gameStarted ? (
        <>
          <Timer 
            delayResend={initialTime}
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
            onTimeUpdate={setInitialTime}
          />
          <div className="current-list-name">{listName}</div>
          <FlipCard 
            command={currentShortcut.command}
            shortcutKey={currentShortcut.key}
          />
        </>
      ) : (
        <Instructions listName={listName} initialTime={initialTime} />
      )}
    </div>
  );
};

export default Hotkey;