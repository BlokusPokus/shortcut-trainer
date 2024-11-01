import React from 'react';
import { CommandPalette } from './CommandPallet';
import ControlButtons from './ControlButtons';
import Hotkey from './Hotkey';
import { MainContentProps, Shortcut } from './types/types';


export const MainContent: React.FC<MainContentProps> = ({
  theme,
  handleThemeChange,
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
  const handleStartRecording = () => setGameStarted(true);
  const handleStopRecording = () => setGameStarted(false);
  
  const handleSkipShortcut = () => {
    setCurrentShortcutIndex((prevIndex) => (prevIndex + 1) % shortcutList.length);
    setInputHistory(prev => [
      ...prev, 
      {
        text: `${shortcutList[currentShortcutIndex].key} - ${shortcutList[currentShortcutIndex].command}`,
        status: 'skipped'
      }
    ]);
  };

  const handlePickShortcutList = (list: Shortcut[]) => {
    setShortcutList(list);
  };

  return (
    <div className="main-content">
      <div className="top-section">
        <CommandPalette 
          onThemeChange={handleThemeChange}
          currentTheme={theme}
        />
      </div>
      <div className="hotkey-section">
        <Hotkey
          gameStarted={gameStarted}
          currentShortcutIndex={currentShortcutIndex}
          setCurrentShortcutIndex={setCurrentShortcutIndex}
          setInputHistory={setInputHistory} 
          inputHistory={inputHistory}
          shortcutList={shortcutList}
          setGameStarted={setGameStarted}
          initialTime={initialTime}
          setInitialTime={setInitialTime}
          setShortcutList={setShortcutList}
        />
      </div>
      <div className="control-buttons">
        <ControlButtons
          handlePickShortcutList={handlePickShortcutList}
          handleSkipShortcut={handleSkipShortcut}
          handleStartRecording={handleStartRecording}
          handleStopRecording={handleStopRecording}
          gameStarted={gameStarted}
          initialTime={initialTime}
          setInitialTime={setInitialTime}
        />
      </div>
    </div>
  );
};