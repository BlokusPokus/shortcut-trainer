import React, { useEffect } from "react";
import { vsCodeShortchutMac } from "./shortcutData";

interface KeySequenceListenerProps {
  keySequence: string;
  inputHistory: { text: string; status: "skipped" | "found" | "wrong" }[];
  setInputHistory: React.Dispatch<
    React.SetStateAction<
      { text: string; status: "skipped" | "found" | "wrong" }[]
    >
  >;
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
  let currentKeysSet = new Set<string>();
  const currentShortcut = vsCodeShortchutMac[currentShortcutIndex];

  useEffect(() => {
    if (!gameStarted) return;

    const getKeyRepresentation = (e: KeyboardEvent): string => {
      switch (e.key) {
        case 'Control':
          return 'Ctrl';
        case 'Meta':
          return 'Cmd';
        case 'Alt':
          return 'Alt';
        case ' ':
          return 'Space';
        default:
          return e.key.length === 1 ? e.key.toUpperCase() : e.key;
      }
    };

    const validateCombination = () => {
      const currentKeys = Array.from(currentKeysSet).sort().join('+');
      console.log(`Validating combination: ${currentKeys}`);
      if (currentKeys !== currentShortcut.key) {
        console.log(`Incorrect key sequence: ${currentKeys}`);
        setInputHistory((prev) => [
          ...prev,
          { text: `${currentKeys} - (Wrong)`, status: "wrong" },
        ]);
        console.log("updated inputHistory");
        console.log(inputHistory);
      }
      currentKeysSet.clear();
      console.log("Reset currentKeysSet");
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      const keyRepresentation = getKeyRepresentation(e);
      currentKeysSet.add(keyRepresentation);
      console.log(`Key down: ${keyRepresentation}, currentKeysSet: ${Array.from(currentKeysSet).join('+')}, numberOfKeysStillPressed: ${currentKeysSet.size}`);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      const keyRepresentation = getKeyRepresentation(e);
      currentKeysSet.delete(keyRepresentation);
      console.log(`Key up: ${keyRepresentation}, numberOfKeysStillPressed: ${currentKeysSet.size}`);
      if (currentKeysSet.size === 0) {
        validateCombination();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameStarted, currentShortcut.key, setInputHistory]);

  
  return null;
};


export default BadShortcut;
