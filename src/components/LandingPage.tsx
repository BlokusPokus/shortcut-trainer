import React, { useState } from 'react';
import './LandingPage.css';
import Hotkeytest from './hotkeytest';
import History from './History';
import { cursorShortcut, vsCodeShortchutMac } from "./shortcutData";
import BrowserShortcut from './BrowserShortcut';
interface LandingPageProps {
    toggleTheme: () => void;
    isDarkTheme: boolean;
}

const choosenShortcut = vsCodeShortchutMac
const LandingPage: React.FC<LandingPageProps> = ({ toggleTheme, isDarkTheme }) => {
    const [gameStarted, setGameStarted] = useState(false);
    const [currentShortcutIndex, setCurrentShortcutIndex] = useState(0);
    const [inputHistory, setInputHistory] = useState<{text: string, status: 'skipped' | 'found'}[]>([]);
    const handleStartRecording = () => {
        setGameStarted(true);
    };

    const handleStopRecording = () => {
        setGameStarted(false);
    };

    const handleSkipShortcut = () => {
        console.log('handleskip trigerred ')
        setCurrentShortcutIndex((prevIndex) => (prevIndex + 1) % choosenShortcut.length);
        setInputHistory(prev => [...prev, {text: `${choosenShortcut[currentShortcutIndex].key} - ${choosenShortcut[currentShortcutIndex].command}`, status: 'skipped'}]);    };

    return (
        <>
        <BrowserShortcut />
        <button className='theme-button' onClick={toggleTheme}>Toggle Theme</button>
        <div className={`container  ${isDarkTheme ? 'dark-theme' : ''}`}>
            
            <div className='top-section'>
                <div className="intro-text">don't bang your head too hard. your goal is to practice your shortcut skills.</div>
            </div>
            <div className='hotkey-section'>
                <Hotkeytest
                    gameStarted={gameStarted}
                    currentShortcutIndex={currentShortcutIndex}
                    setCurrentShortcutIndex={setCurrentShortcutIndex}
                    setInputHistory={setInputHistory} 
                    inputHistory={inputHistory}
                />
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
