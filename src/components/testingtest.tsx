

import React, { useEffect } from "react";
import { vsCodeShortchutMac } from "./shortcutData";

interface KeySequenceListenerProps {
  keySequence: string;
  setInputHistory: React.Dispatch<React.SetStateAction<{ text: string; status: "skipped" | "found" | "wrong" }[]>>;
  inputHistory: { text: string; status: "skipped" | "found" | "wrong" }[];
  currentShortcutIndex: number;
  gameStarted: boolean;
}

const BadShortcut: React.FC<KeySequenceListenerProps> = ({
  inputHistory,
  setInputHistory,
  currentShortcutIndex,
  gameStarted,
}) => {
    
  let numberOfKeysStillPressed = 0;
  let currentKeys = "";
  const currentShortcut = vsCodeShortchutMac[currentShortcutIndex];
  const pressedKeys = new Set<string>(); // Track pressed keys

  useEffect(() => {
    if (!gameStarted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (!pressedKeys.has(e.key)) {
        pressedKeys.add(e.key);
        
        // Handle modifier keys
        if (e.ctrlKey && !currentKeys.includes('[Ctrl]')) currentKeys += '[Ctrl]';
        if (e.shiftKey && !currentKeys.includes('[Shift]')) currentKeys += '[Shift]';
        if (e.altKey && !currentKeys.includes('[Alt]')) currentKeys += '[Alt]';
        if (e.metaKey && !currentKeys.includes('[Meta]')) currentKeys += '[Meta]';
        
        // Handle regular keys
        if (!['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) {
          currentKeys += e.key;
        }
        
        numberOfKeysStillPressed++;
        console.log(`Key down: ${e.key}, currentKeys: ${currentKeys}, numberOfKeysStillPressed: ${numberOfKeysStillPressed}`);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      console.log(`Key up event: ${e.key}`); // Debugging log
      if (pressedKeys.has(e.key)) {
        pressedKeys.delete(e.key);
        numberOfKeysStillPressed--;
        console.log(`Key up: ${e.key}, numberOfKeysStillPressed: ${numberOfKeysStillPressed}`);
        if (numberOfKeysStillPressed <= 0) {
          validateCombination();
          currentKeys = "";
          numberOfKeysStillPressed = 0;
        }
      }
    };

    const validateCombination = () => {
      if (currentKeys !== currentShortcut.key) {
        const wrongKey = `${currentKeys} - (Wrong)`;
        setInputHistory((prev) => [
          ...prev,
          { text: wrongKey, status: "wrong" },
        ]);
      }
      console.log("Reset currentKeys");
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };

  }, [gameStarted, currentShortcut.key, setInputHistory, inputHistory, currentKeys]);

  return null;
};

export default BadShortcut;
