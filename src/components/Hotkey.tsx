//#region Imports
// React and Third-party Libraries
import React, { useReducer, useEffect } from 'react';
// Hooks and Context
import { useHotkeyLogic } from './hooks/useHotkeyLogic';
// Components
import { FlipCard } from './FlipCard';
import Timer from './Timer';
import { Instructions } from './Instructions';
// Types
import { HotkeyProps } from './types/types';
// Styles
import './styles/Hotkey.css';
// Utilities
import { listNameReducer } from './utils/utils';
//#endregion

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