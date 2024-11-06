//#region Imports and Third-party Libraries

// React and Third-party Libraries
import React, { useState, useCallback } from 'react';
// Hooks and Context
import { usePalletContext } from '../../PalletContext';
// Types
import { Shortcut } from '../types/types';
// Constants
import { DEFAULT_THEMES } from '../constants/defaultThemes';
import { vsCodeShortchutMac } from '../constants/shortcutLists';
// Styles
import '../styles/LandingPage.css';
// Components
import History from '../history/History';
import BrowserShortcut from '../hotkeys/BrowserShortcut';
import ControlButtons from '../hotkeys/ControlButtons';
import Header from './Header';
import Hotkey from '../hotkeys/Hotkey';
import Footer from './Footer';
import { CommandPalette } from '../themes/CommandPallet';
//#endregion

const LandingPage: React.FC = () => {
  const { theme, setTheme } = usePalletContext();
  const [shortcutList, setShortcutList] = useState<Shortcut[]>(
    vsCodeShortchutMac.map(item => ({
      ...item,
      listId: 'VS_CODE',
    }))
  );
  const [gameStarted, setGameStarted] = useState(false);
  const [currentShortcutIndex, setCurrentShortcutIndex] = useState(0);
  const [inputHistory, setInputHistory] = useState<
    { text: string; status: 'skipped' | 'found' | 'wrong' }[]
  >([]);
  const [initialTime, setInitialTime] = useState<number>(180);

  const handleStartRecording = useCallback(() => {
    setGameStarted(true);
  }, [setGameStarted]);

  const handleStopRecording = useCallback(() => {
    setGameStarted(false);
  }, [setGameStarted]);

  const handleSkipShortcut = useCallback(() => {
    setCurrentShortcutIndex(prevIndex => (prevIndex + 1) % shortcutList.length);
    setInputHistory(prev => [
      ...prev,
      {
        text: `${shortcutList[currentShortcutIndex].key} - ${shortcutList[currentShortcutIndex].command}`,
        status: 'skipped',
      },
    ]);
  }, [
    setCurrentShortcutIndex,
    setInputHistory,
    shortcutList,
    currentShortcutIndex,
  ]);

  const handlePickShortcutList = (list: Shortcut[]) => {
    setShortcutList(list);
    setCurrentShortcutIndex(0);
  };
  const handleThemeChange = (themeId: string) => {
    const selectedTheme = DEFAULT_THEMES.find(theme => theme.id === themeId);
    if (selectedTheme?.className) {
      setTheme(selectedTheme.className);
      localStorage.setItem('theme', selectedTheme.className);
    }
  };
  return (
    <div className={theme}>
      <Header gameStarted={gameStarted} />

      <BrowserShortcut />

      <div className={`container `}>
        <div>
          <CommandPalette
            onThemeChange={handleThemeChange}
            currentTheme={theme}
          />{' '}
        </div>
        <div className="main-content">
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
        <div>
          <History
            inputHistory={inputHistory}
            shortcutList={shortcutList}
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
