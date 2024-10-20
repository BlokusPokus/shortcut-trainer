import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"


export const shortcutList = [
    { shortcut: 'ctrl+c', action: 'Copy' },
    { shortcut: 'ctrl+v', action: 'Paste' },
    { shortcut: 'ctrl+x', action: 'Cut' },
    { shortcut: 'ctrl+z', action: 'Undo' },
    { shortcut: 'ctrl+y', action: 'Redo' },
    { shortcut: 'ctrl+f', action: 'Find' },
    { shortcut: 'ctrl+h', action: 'Replace' },
    { shortcut: 'ctrl+s', action: 'Save' },
    { shortcut: 'ctrl+n', action: 'New File' },
    { shortcut: 'ctrl+o', action: 'Open File' },
    { shortcut: 'ctrl+w', action: 'Close File' },
    { shortcut: 'ctrl+p', action: 'Quick Open' },
    { shortcut: 'ctrl+`', action: 'Toggle Terminal' },
    { shortcut: 'ctrl+b', action: 'Toggle Sidebar' },
    { shortcut: 'ctrl+/', action: 'Toggle Line Comment' },
    { shortcut: 'ctrl+shift+k', action: 'Delete Line' },
    { shortcut: 'ctrl+enter', action: 'Insert Line Below' },
    { shortcut: 'ctrl+shift+enter', action: 'Insert Line Above' },
    { shortcut: 'alt+up', action: 'Move Line Up' },
    { shortcut: 'alt+down', action: 'Move Line Down' },
  ]

  
  interface HotkeytestProps {
    gameStarted: boolean;
    currentShortcutIndex: number;
    setCurrentShortcutIndex: React.Dispatch<React.SetStateAction<number>>;
}

  const Hotkeytest = ({ gameStarted, currentShortcutIndex, setCurrentShortcutIndex }: HotkeytestProps) => {
      const [inputHistory, setInputHistory] = useState<string[]>([]);
  
      const currentShortcut = shortcutList[currentShortcutIndex];
  
      useHotkeys(currentShortcut.shortcut, () => {
          if (gameStarted) {
              console.log(`Action performed: ${currentShortcut.action}`);
              setInputHistory(prev => [...prev, `${currentShortcut.shortcut} - ${currentShortcut.action} (valid)`]);
  
              setCurrentShortcutIndex((prevIndex: number) => (prevIndex + 1) % shortcutList.length);
          }
      }, [gameStarted, currentShortcut]);
  
      return (
          <>
              <div>
                  <p>Action: {currentShortcut.action}</p>
              </div>
              <div className="bottom-section">HISTORY OF INPUTS</div>
              <div>
                  {inputHistory.map((input, index) => (
                      <div key={index}>{input}</div>
                  ))}
              </div>
          </>
      );
  }
  
  export default Hotkeytest;
  