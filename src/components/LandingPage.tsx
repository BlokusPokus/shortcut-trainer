import React, { useState, useEffect, useCallback } from 'react';
import './LandingPage.css';
import History from './History';
import { vsCodeShortchutMac } from "./shortcutData";
import BrowserShortcut from './BrowserShortcut';
import ControlButtons from './ControlButtons';
import Hero from './Hero';
import Header from './Header';
import Hotkey from './Hotkey';

interface LandingPageProps {
    toggleTheme: () => void;
    isDarkTheme: boolean;
}

const choosenShortcut = vsCodeShortchutMac;

const LandingPage: React.FC<LandingPageProps> = ({ toggleTheme, isDarkTheme }) => {
    const [gameStarted, setGameStarted] = useState(false);
    const [currentShortcutIndex, setCurrentShortcutIndex] = useState(0);
    const [inputHistory, setInputHistory] = useState<{text: string, status: 'skipped' | 'found' | 'wrong'}[]>([]);
    const [pressedKeys, setPressedKeys] = useState(new Set<string>());

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (gameStarted) {
            e.preventDefault();
            setPressedKeys(prev => new Set(prev).add(e.key.toLowerCase()));
        }
    }, [gameStarted]);

    const handleKeyUp = useCallback((e: KeyboardEvent) => {
        if (gameStarted) {
            e.preventDefault();
            const currentShortcut = choosenShortcut[currentShortcutIndex];
            const expectedKeys = currentShortcut.key.toLowerCase().split('+');
            const pressedKeysArray = Array.from(pressedKeys);

            const isCorrect = expectedKeys.length === pressedKeysArray.length &&
                              expectedKeys.every(key => pressedKeysArray.includes(key));

            if (isCorrect) {
                setInputHistory(prev => [...prev, {
                    text: `${currentShortcut.key} - ${currentShortcut.command}`,
                    status: 'found'
                }]);
                setCurrentShortcutIndex((prevIndex) => (prevIndex + 1) % choosenShortcut.length);
            } else if (pressedKeysArray.length > 0) {
                setInputHistory(prev => [...prev, {
                    text: `${pressedKeysArray.join('+')} - ${currentShortcut.command}`,
                    status: 'wrong'
                }]);
            }

            setPressedKeys(new Set());
        }
    }, [gameStarted, currentShortcutIndex, pressedKeys]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    const handleStartRecording = () => {
        setGameStarted(true);
    };

    const handleStopRecording = () => {
        setGameStarted(false);
    };

    const handleSkipShortcut = () => {
        setCurrentShortcutIndex((prevIndex) => (prevIndex + 1) % choosenShortcut.length);
        setInputHistory(prev => [...prev, {
            text: `${choosenShortcut[currentShortcutIndex].key} - ${choosenShortcut[currentShortcutIndex].command}`,
            status: 'skipped'
        }]);
    };

    const handlePickShortcutList = () => {}

    return (
        <>
            <Header/>
            <BrowserShortcut />
            <button className='theme-button' onClick={toggleTheme}>Toggle Theme</button>
            <div className={`container ${isDarkTheme ? 'dark-theme' : ''}`}>
                <div className='top-section'>
                    <Hero/>
                </div>
                <div className='main-content'>
                    <div className='hotkey-section'>
                        <Hotkey
                       gameStarted={gameStarted}
                       currentShortcutIndex={currentShortcutIndex}
                       setCurrentShortcutIndex={setCurrentShortcutIndex}
                       setInputHistory={setInputHistory} 
                       inputHistory={inputHistory}
                        />
                    </div>
                    <div className="control-buttons">
                        <ControlButtons
                            handlePickShortcutList={handlePickShortcutList}
                            handleSkipShortcut={handleSkipShortcut}
                            handleStartRecording={handleStartRecording}
                            handleStopRecording={handleStopRecording}
                            gameStarted={gameStarted}
                        />
                    </div>
                </div>
                <div>
                    <History
                        inputHistory={inputHistory}
                    />
                </div>
            </div>
        </>
    );
}

export default LandingPage;
