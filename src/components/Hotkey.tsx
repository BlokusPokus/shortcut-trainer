import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { cursorShortcut,vsCodeShortchutMac } from "./shortcutData";
import './Hotkey.css';



  
  interface HotkeyProps {
    gameStarted: boolean;
    currentShortcutIndex: number;
    setCurrentShortcutIndex: React.Dispatch<React.SetStateAction<number>>;
    inputHistory: {text: string, status: 'skipped' | 'found' | 'wrong'}[];
    setInputHistory: React.Dispatch<React.SetStateAction<{text: string, status: 'skipped' | 'found' | 'wrong'}[]>>;
}

  const Hotkey = ({ gameStarted, currentShortcutIndex, setCurrentShortcutIndex,inputHistory,setInputHistory }: HotkeyProps) => {
  
      const currentShortcut = vsCodeShortchutMac[currentShortcutIndex];
  
      useHotkeys(currentShortcut.key, () => {
          if (gameStarted) {
              console.log(`Action performed: ${currentShortcut.command}`);
              setInputHistory(prev => [...prev, {text: `${currentShortcut.key} - ${currentShortcut.command}`, status: 'found'}]);
  
              setCurrentShortcutIndex((prevIndex: number) => (prevIndex + 1) % cursorShortcut.length);
          }
      }, [gameStarted, currentShortcut]);
  
      return (
          <div className="Hotkey-container">
              {gameStarted ? (
                  <div className="flip-card">
                      <div className="flip-card-inner">
                          <div className="flip-card-front">
                              <h2 className="action-command">{currentShortcut.command}</h2>
                          </div>
                          <div className="flip-card-back">
                              <p className="action-key ">{currentShortcut.key}</p>
                          </div>
                      </div>
                  </div>
              ) : (
                  <p className="start-message">Press Start to begin</p>
              )}
          </div>
      );
  }
  
  export default Hotkey;
  
