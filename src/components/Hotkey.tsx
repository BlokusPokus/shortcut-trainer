import React, { useState, useEffect, useCallback, useRef } from "react"
import { useRecordHotkeys } from "react-hotkeys-hook"
import './styles/Hotkey.css';
import { usePalletContext } from "../PalletContext";
import Timer from "./Timer";
import { vsCodeShortchutMac, macOsShortcut, cursorShortcut } from "./shortcutLists";
import { shuffleArray } from "./shortcutData";
import { List, Play, Timer as TimerIcon } from "lucide-react";

interface HotkeyProps {
    gameStarted: boolean;
    currentShortcutIndex: number;
    setCurrentShortcutIndex: React.Dispatch<React.SetStateAction<number>>;
    inputHistory: {text: string, status: 'skipped' | 'found' | 'wrong'}[];
    setInputHistory: React.Dispatch<React.SetStateAction<{text: string, status: 'skipped' | 'found' | 'wrong'}[]>>;
    shortcutList: { key: string; command: string; }[]; // Add this line
    setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
    initialTime: number;
    setInitialTime: React.Dispatch<React.SetStateAction<number>>;
    setShortcutList: React.Dispatch<React.SetStateAction<{ key: string; command: string; }[]>>;
}

const Hotkey = ({ 
    gameStarted, 
    currentShortcutIndex, 
    setCurrentShortcutIndex, 
    inputHistory, 
    setInputHistory,
    shortcutList,
    setGameStarted,
    initialTime,
    setInitialTime,
    setShortcutList
}: HotkeyProps) => {
  
    const currentShortcut = shortcutList[currentShortcutIndex]; // Use shortcutList instead of vsCodeShortchutMac
    const [lastRecordedKeys, setLastRecordedKeys] = useState<string>('');
    const processingRef = useRef(false);

    console.log('Rendering Hotkey component', { gameStarted, currentShortcutIndex, currentShortcut });

    const [recordedKeys, { start: startRecording, stop: stopRecording, isRecording, resetKeys }] = useRecordHotkeys();

    const processRecordedKeys = useCallback(() => {
        if (gameStarted && recordedKeys.size > 0 && !processingRef.current) {
            processingRef.current = true;
            const keyCombo = Array.from(recordedKeys).join('+');
            
            // Normalize both the input and expected shortcuts
            const normalizeShortcut = (shortcut: string) => {
                return shortcut.split('+').sort().join('+');
            };

            const normalizedInput = normalizeShortcut(keyCombo);
            const normalizedExpected = normalizeShortcut(currentShortcut.key);
            
            if (normalizedInput === normalizedExpected) {
                console.log(`Correct shortcut entered: ${currentShortcut.command}`);
                setInputHistory(prev => [...prev, { text: `${keyCombo} - ${currentShortcut.command}`, status: 'found' as const }]);
                
                // Check if we've completed all shortcuts
                const nextIndex = (currentShortcutIndex + 1) % shortcutList.length;
                if (nextIndex === 0) {
                    // Reshuffle the list when we complete all shortcuts
                    setShortcutList(shuffleArray([...shortcutList]));
                }
                setCurrentShortcutIndex(nextIndex);
            } else {
                console.log('Wrong combination entered');
                setInputHistory(prev => [...prev, { text: `${keyCombo} - ${currentShortcut.command} `, status: 'wrong' as const }]);
            }
            
            setLastRecordedKeys(keyCombo);
            resetKeys();
            
            setTimeout(() => {
                processingRef.current = false;
            }, 300);
        }
    }, [gameStarted, recordedKeys, currentShortcut, setInputHistory, setCurrentShortcutIndex, resetKeys, shortcutList, currentShortcutIndex, setShortcutList]);

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

    // Add this function to get current list name
    const getCurrentListName = () => {
        const shortcutLists = [
            { name: "VS Code Shortcuts (Mac)", list: vsCodeShortchutMac },
            { name: "macOS Shortcuts", list: macOsShortcut },
            { name: "Cursor Shortcuts", list: cursorShortcut }
        ];
        
        const currentList = shortcutLists.find(item => {
            // Compare the first few items to identify the list
            return item.list.some(shortcut => 
                shortcutList.some(currentShortcut => 
                    currentShortcut.key === shortcut.key && 
                    currentShortcut.command === shortcut.command
                )
            );
        });
        
        return currentList ? currentList.name : "Selected Shortcuts";
    };

    return (
        <div className={`Hotkey-container`}>
            {gameStarted ? (
                <>
                    <Timer 
                        delayResend={initialTime}
                        gameStarted={gameStarted}
                        setGameStarted={setGameStarted}
                        onTimeUpdate={setInitialTime}
                    />
                    <div className="current-list-name">{getCurrentListName()}</div>
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
                    
                </>
            ) : (
                <div >
                    <p >Press <Play/> to begin</p>
                    <p > Press <List/> to pick a shortcut list</p>
                    <p > Press <TimerIcon/> to set the timer</p>
                    <div className="current-list-name">{getCurrentListName()}</div>
                </div>
            )}
        </div>
    );
}

export default Hotkey;
