import { useState, useCallback, useRef, useEffect } from 'react';
import { useRecordHotkeys } from 'react-hotkeys-hook';
import { shuffleArray } from '../shortcutData';
import { HotkeyProps } from '../types/types';

export const useHotkeyLogic = ({
  gameStarted,
  currentShortcutIndex,
  setCurrentShortcutIndex,
  setInputHistory,
  shortcutList,
  setShortcutList,
}: Pick<HotkeyProps, 'gameStarted' | 'currentShortcutIndex' | 'setCurrentShortcutIndex' | 'setInputHistory' | 'shortcutList' | 'setShortcutList'>) => {
  const [lastRecordedKeys, setLastRecordedKeys] = useState<string>('');
  const processingRef = useRef(false);
  const [recordedKeys, { start: startRecording, stop: stopRecording, resetKeys }] = useRecordHotkeys();

  const processRecordedKeys = useCallback(() => {
    if (gameStarted && recordedKeys.size > 0 && !processingRef.current) {
      processingRef.current = true;
      const keyCombo = Array.from(recordedKeys).join('+');
      
      const normalizeShortcut = (shortcut: string) => {
        return shortcut.split('+').sort().join('+');
      };

      const currentShortcut = shortcutList[currentShortcutIndex];
      const normalizedInput = normalizeShortcut(keyCombo);
      const normalizedExpected = normalizeShortcut(currentShortcut.key);
      
      if (normalizedInput === normalizedExpected) {
        setInputHistory(prev => [...prev, { text: `${keyCombo} - ${currentShortcut.command}`, status: 'found' }]);
        
        const nextIndex = (currentShortcutIndex + 1) % shortcutList.length;
        if (nextIndex === 0) {
          setShortcutList(shuffleArray([...shortcutList]));
        }
        setCurrentShortcutIndex(nextIndex);
      } else {
        setInputHistory(prev => [...prev, { text: `${keyCombo} - ${currentShortcut.command} `, status: 'wrong' }]);
      }
      
      setLastRecordedKeys(keyCombo);
      resetKeys();
      
      setTimeout(() => {
        processingRef.current = false;
      }, 300);
    }
  }, [gameStarted, recordedKeys, currentShortcutIndex, setInputHistory, setCurrentShortcutIndex, resetKeys, shortcutList, setShortcutList]);

  useEffect(() => {
    if (gameStarted) {
      startRecording();
    } else {
      stopRecording();
    }
    resetKeys();
    processingRef.current = false;
  }, [gameStarted, startRecording, stopRecording, resetKeys]);

  useEffect(() => {
    if (gameStarted && recordedKeys.size > 0) {
      const timeoutId = setTimeout(processRecordedKeys, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [gameStarted, recordedKeys, processRecordedKeys]);

  return {
    lastRecordedKeys,
    recordedKeys,
  };
};