import React, { useState, useCallback } from 'react';
import './LandingPage.css';
import History from './History';
import { cursorShortcut, vsCodeShortchutMac } from "./shortcutData";
import BrowserShortcut from './BrowserShortcut';
import ControlButtons from './ControlButtons';
import Hero from './Hero';
import Header from './Header';
import Hotkey from './Hotkey';
import Footer from './Footer';
import { usePalletContext } from '../PalletContext'

interface LandingPageProps {

}

const choosenShortcut = vsCodeShortchutMac
const LandingPage: React.FC<LandingPageProps> = () => {
    const { theme } = usePalletContext();

    const [gameStarted, setGameStarted] = useState(false);
    const [currentShortcutIndex, setCurrentShortcutIndex] = useState(0);
    const [inputHistory, setInputHistory] = useState<{text: string, status: 'skipped' | 'found' | 'wrong'}[]>([]);
    
    const handleStartRecording = useCallback(() => {
        setGameStarted(true);
    }, [setGameStarted]);
    
    const handleStopRecording = useCallback(() => {
        setGameStarted(false);
    }, [setGameStarted]);
    
    const handleSkipShortcut = useCallback(() => {
        setCurrentShortcutIndex((prevIndex) => (prevIndex + 1) % choosenShortcut.length);
        setInputHistory(prev => [
            ...prev, 
            {
                text: `${choosenShortcut[currentShortcutIndex].key} - ${choosenShortcut[currentShortcutIndex].command}`,
                status: 'skipped'
            }
        ]);
    }, [setCurrentShortcutIndex, setInputHistory, choosenShortcut, currentShortcutIndex]);
    
    const handlePickShortcutList = () => {}

    return (
        <div className={theme}>
        <Header  />
        <BrowserShortcut />

        <div className={`container `}>
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
        <Footer />
        </div>
    );
}

export default LandingPage;
