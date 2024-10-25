import React, { useEffect, useRef } from "react";
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
  const pressedKeysRef = useRef(new Set<string>());
  const currentKeysRef = useRef(new Set<string>());
  const currentShortcut = vsCodeShortchutMac[currentShortcutIndex];
  const validationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!gameStarted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      const normalizedKey = normalizeKey(e.code);
      if (!pressedKeysRef.current.has(normalizedKey)) {
        pressedKeysRef.current.add(normalizedKey);
        currentKeysRef.current.add(normalizedKey);
        console.log(`Key down: ${normalizedKey}, Current keys: ${Array.from(currentKeysRef.current).join(', ')}, Pressed keys: ${Array.from(pressedKeysRef.current).join(', ')}`);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      const normalizedKey = normalizeKey(e.code);
      if (pressedKeysRef.current.has(normalizedKey)) {
        pressedKeysRef.current.delete(normalizedKey);
        console.log(`Key up: ${normalizedKey}, Remaining pressed keys: ${Array.from(pressedKeysRef.current).join(', ')}`);
        
        if (validationTimeoutRef.current) {
          clearTimeout(validationTimeoutRef.current);
        }
        
        validationTimeoutRef.current = setTimeout(() => {
          if (pressedKeysRef.current.size === 0) {
            validateCombination();
          }
        }, 50); // 50ms delay
      }
    };

    const normalizeKey = (code: string): string => {
      switch (code) {
        case 'ShiftLeft':
        case 'ShiftRight':
          return '[Shift]';
        case 'ControlLeft':
        case 'ControlRight':
          return '[Ctrl]';
        case 'AltLeft':
        case 'AltRight':
          return '[Alt]';
        case 'MetaLeft':
        case 'MetaRight':
          return '[Meta]';
        default:
          return code.replace('Key', '').toLowerCase();
      }
    };

    const validateCombination = () => {
      const inputCombination = Array.from(currentKeysRef.current).sort().join(',').toLowerCase();
      const expectedCombinations = currentShortcut.key.toLowerCase().split(', ').map(combo => 
        combo.split('+').sort().join(',')
      );

      console.log(`Validating - Input: ${inputCombination}, Expected: ${expectedCombinations.join(' OR ')}`);

      if (!expectedCombinations.includes(inputCombination)) {
        const wrongKey = `${Array.from(currentKeysRef.current).join('+')} - (Wrong)`;
        console.log(`Incorrect combination. Expected: ${currentShortcut.key}, Got: ${wrongKey}`);
        setInputHistory((prev) => [
          ...prev,
          { text: wrongKey, status: "wrong" },
        ]);
      } else {
        console.log(`Correct combination: ${inputCombination}`);
        // Add logic here for correct combinations if needed
      }

      currentKeysRef.current.clear();
      console.log("Current keys reset");
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
    };

  }, [gameStarted, currentShortcut.key, setInputHistory]);

  return null;
};

export default BadShortcut;
