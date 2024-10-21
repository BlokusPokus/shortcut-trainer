import React, { useState } from 'react';
import './LandingPage.css';
import Hotkeytest from './hotkeytest';
import History from './History';
import { cursorShortcut } from "./shortcutData";

interface LandingPageProps {
    toggleTheme: () => void;
    isDarkTheme: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ toggleTheme, isDarkTheme }) => {
    const [gameStarted, setGameStarted] = useState(false);
    const [currentShortcutIndex, setCurrentShortcutIndex] = useState(0);
    const [inputHistory, setInputHistory] = useState<string[]>([]);

    const handleStartRecording = () => {
        setGameStarted(true);
    };

    const handleStopRecording = () => {
        setGameStarted(false);
    };

    const handleSkipShortcut = () => {
        console.log('handleskip trigerred ')
        setCurrentShortcutIndex((prevIndex) => (prevIndex + 1) % cursorShortcut.length);
        setInputHistory(prev => [...prev, `${cursorShortcut[currentShortcutIndex].key} - ${cursorShortcut[currentShortcutIndex].command} (skipped)`]);
    };

    return (
        <>
        <button className='theme-button' onClick={toggleTheme}>Toggle Theme</button>
        <div className={`container  ${isDarkTheme ? 'dark-theme' : ''}`}>
            
            <div >
                <div>don't bang your head too hard. your goal is to practice your shortcut skills.</div>
                <div>What's the shortcut for: </div>
                <Hotkeytest
                    gameStarted={gameStarted}
                    currentShortcutIndex={currentShortcutIndex}
                    setCurrentShortcutIndex={setCurrentShortcutIndex}
                    setInputHistory={setInputHistory} 
                    inputHistory={inputHistory}
                />
            </div>
            <div className="middle-section">
                <button 
                    onClick={handleStartRecording} 
                    disabled={gameStarted}
                    className={gameStarted ? 'disabled' : ''}
                >
                    Start
                </button>
                <button 
                    onClick={handleStopRecording} 
                    disabled={!gameStarted}
                    className={!gameStarted ? 'disabled' : ''}
                >
                    Stop
                </button>
                <button 
                    onClick={handleSkipShortcut} 
                    disabled={!gameStarted}
                    className={!gameStarted ? 'disabled' : ''}
                >
                    Skip
                </button>
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
