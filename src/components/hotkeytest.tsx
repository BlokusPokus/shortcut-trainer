import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { cursorShortcut } from "./shortcutData";
import './hotkeytest.css';



  
  interface HotkeytestProps {
    gameStarted: boolean;
    currentShortcutIndex: number;
    setCurrentShortcutIndex: React.Dispatch<React.SetStateAction<number>>;
    inputHistory: string[];
    setInputHistory:React.Dispatch<React.SetStateAction<string[]>>;
}

  const Hotkeytest = ({ gameStarted, currentShortcutIndex, setCurrentShortcutIndex,inputHistory,setInputHistory }: HotkeytestProps) => {
  
      const currentShortcut = cursorShortcut[currentShortcutIndex];
  
      useHotkeys(currentShortcut.key, () => {
          if (gameStarted) {
              console.log(`Action performed: ${currentShortcut.command}`);
              setInputHistory(prev => [...prev, `${currentShortcut.key} - ${currentShortcut.command} (valid)`]);
  
              setCurrentShortcutIndex((prevIndex: number) => (prevIndex + 1) % cursorShortcut.length);
          }
      }, [gameStarted, currentShortcut]);
  
      return (
          <div className="hotkeytest-container">
              {gameStarted ? (
                  <div className="action-display">
                      <p className="action-label">Action:</p>
                      <h2 className="action-command">{currentShortcut.command}</h2>
                  </div>
              ) : (
                  <p className="start-message">Press Start to begin</p>
              )}
          </div>
      );
  }
  
  export default Hotkeytest;
  
