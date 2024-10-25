import React, { useState, useEffect, useCallback, useRef } from "react"
import { useRecordHotkeys } from "react-hotkeys-hook"
import { cursorShortcut, vsCodeShortchutMac } from "./shortcutData";
import './Hotkey.css';
import { usePalletContext } from "../PalletContext";



  
  interface HotkeyProps {
    gameStarted: boolean;
    currentShortcutIndex: number;
    setCurrentShortcutIndex: React.Dispatch<React.SetStateAction<number>>;
    inputHistory: {text: string, status: 'skipped' | 'found' | 'wrong'}[];
    setInputHistory: React.Dispatch<React.SetStateAction<{text: string, status: 'skipped' | 'found' | 'wrong'}[]>>;
}

  const Hotkey = ({ gameStarted, currentShortcutIndex, setCurrentShortcutIndex, inputHistory, setInputHistory }: HotkeyProps) => {
  
      const currentShortcut = vsCodeShortchutMac[currentShortcutIndex];
      const { theme } = usePalletContext();
      const [lastRecordedKeys, setLastRecordedKeys] = useState<string>('');
      const processingRef = useRef(false);
  
      console.log('Rendering Hotkey component', { gameStarted, currentShortcutIndex, currentShortcut });

      const [recordedKeys, { start: startRecording, stop: stopRecording, isRecording, resetKeys }] = useRecordHotkeys();
  
      const processRecordedKeys = useCallback(() => {
        if (gameStarted && recordedKeys.size > 0 && !processingRef.current) {
          processingRef.current = true;
          const keyCombo = Array.from(recordedKeys).join('+');
          console.log('Processing recorded combination', { keyCombo, currentShortcut: currentShortcut.key });
          
          if (keyCombo === currentShortcut.key) {
            console.log(`Correct shortcut entered: ${currentShortcut.command}`);
            setInputHistory(prev => [...prev, { text: `${keyCombo} - ${currentShortcut.command}`, status: 'found' as const }]);
            setCurrentShortcutIndex((prevIndex: number) => (prevIndex + 1) % cursorShortcut.length);
          } else {
            console.log('Wrong combination entered');
            setInputHistory(prev => [...prev, { text: `${keyCombo} - Wrong`, status: 'wrong' as const }]);
          }
          
          setLastRecordedKeys(keyCombo);
          resetKeys();
          
          setTimeout(() => {
            processingRef.current = false;
          }, 300);
        }
      }, [gameStarted, recordedKeys, currentShortcut, setInputHistory, setCurrentShortcutIndex, resetKeys]);

      useEffect(() => {
        console.log('Game state changed', { gameStarted });
        if (gameStarted) {
          console.log('Starting recording');
          startRecording();
        } else {
          console.log('Stopping recording');
          stopRecording();
        }
        resetKeys();
        processingRef.current = false;
      }, [gameStarted, startRecording, stopRecording, resetKeys]);

      useEffect(() => {
        console.log('Recorded keys changed', { recordedKeys: Array.from(recordedKeys) });
        if (gameStarted && recordedKeys.size > 0) {
          const timeoutId = setTimeout(() => {
            processRecordedKeys();
          }, 300);

          return () => clearTimeout(timeoutId);
        }
      }, [gameStarted, recordedKeys, processRecordedKeys]);

      return (
          <div className={`Hotkey-container ${theme}`}>
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
                  <p className={`start-message ${theme}`}>Press Start to begin</p>
              )}
          </div>
      );
  }
  
  export default Hotkey;
  
