import React, { useEffect, useRef, useState } from "react";
import { vsCodeShortchutMac } from "./shortcutData";

interface BadShortcutProps {
    setInputHistory: React.Dispatch<React.SetStateAction<{text: string, status: 'skipped' | 'found' | 'wrong'}[]>>;
    currentShortcutIndex: number;
    gameStarted: boolean;
  }
  
  const BadShortcut: React.FC<BadShortcutProps> = ({
    setInputHistory,
    currentShortcutIndex,
    gameStarted
  }) => {
    const currentShortcut = vsCodeShortchutMac[currentShortcutIndex];
    const [pressedKeys, setPressedKeys] = useState(new Set<string>());
    const combinationRef = useRef<string[]>([]);

    useEffect(() => {
      if (!gameStarted) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        event.preventDefault();
        console.log('Key down:', event.key);
        setPressedKeys(prev => {
          const newSet = new Set(prev).add(event.key);
          console.log('Pressed keys after keydown:', Array.from(newSet));
          return newSet;
        });
        combinationRef.current = [...combinationRef.current, event.key];
        console.log('Current combination:', combinationRef.current);
      };

      const handleKeyUp = (event: KeyboardEvent) => {
        event.preventDefault();
        console.log('Key up:', event.key);
        setPressedKeys(prev => {
          const newSet = new Set(prev);
          newSet.delete(event.key);
          console.log('Pressed keys after keyup:', Array.from(newSet));
          return newSet;
        });

        console.log('Pressed keys size before check:', pressedKeys.size);
        if (pressedKeys.size === 1) {
          console.log('Validating combination');
          validateCombination();
        } else {
          console.log('Not validating, pressedKeys.size =', pressedKeys.size);
        }
      };

      const validateCombination = () => {
        const pressedCombination = combinationRef.current.join(' + ');
        const correctCombination = currentShortcut.key;

        console.log('Validating combination:', pressedCombination);
        console.log('Correct combination:', correctCombination);

        if (pressedCombination !== correctCombination) {
          console.log('Wrong key combination pressed:', pressedCombination);
          setInputHistory(prev => [...prev, {
            text: `${pressedCombination} - ${currentShortcut.command} (Wrong)`,
            status: 'wrong'
          }]);
        } else {
          console.log('Correct combination pressed');
        }

        // Reset the combination
        combinationRef.current = [];
        console.log('Combination reset');
      };

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      };
    }, [gameStarted, currentShortcut, setInputHistory, pressedKeys]);

    return null;
  }

  export default BadShortcut;
