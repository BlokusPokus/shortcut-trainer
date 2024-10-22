import React, { useState } from 'react';
import './LandingPage.css';
import History from './History';
import { cursorShortcut, vsCodeShortchutMac } from "./shortcutData";
import BrowserShortcut from './BrowserShortcut';
import ControlButtons from './ControlButtons';
import Hero from './Hero';
import Header from './Header';
import Hotkey from './Hotkey';
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
