import React, { useState, useCallback } from 'react';
import './LandingPage.css';
import History from './History';
import { cursorShortcut, macOsShortcut, vsCodeShortchutMac } from "./shortcutData";
import BrowserShortcut from './BrowserShortcut';
import ControlButtons from './ControlButtons';
import Hero from './Hero';
import Header from './Header';
import Hotkey from './Hotkey';
import Footer from './Footer';
import { usePalletContext } from '../PalletContext'
import Timer from './Timer';
import CommandPallet from './CommandPallet';

interface LandingPageProps {

}

const LandingPage: React.FC<LandingPageProps> = () => {
    const { theme } = usePalletContext();
    const [shortcutList, setShortcutList] = useState<{ key: string; command: string; }[]>(vsCodeShortchutMac);    const [gameStarted, setGameStarted] = useState(false);
    const [currentShortcutIndex, setCurrentShortcutIndex] = useState(0);
    const [inputHistory, setInputHistory] = useState<{text: string, status: 'skipped' | 'found' | 'wrong'}[]>([]);
    const [initialTime, setInitialTime] = useState<number>(180);
  
    const handleStartRecording = useCallback(() => {
        setGameStarted(true);
    }, [setGameStarted]);
    
    const handleStopRecording = useCallback(() => {
        setGameStarted(false);
    }, [setGameStarted]);
    
    const handleSkipShortcut = useCallback(() => {
        setCurrentShortcutIndex((prevIndex) => (prevIndex + 1) % shortcutList.length);
        setInputHistory(prev => [
            ...prev, 
            {
                text: `${shortcutList[currentShortcutIndex].key} - ${shortcutList[currentShortcutIndex].command}`,
                status: 'skipped'
            }
        ]);
    }, [setCurrentShortcutIndex, setInputHistory, shortcutList, currentShortcutIndex]);
    
    const shortcutLists = [
        { name: "VS Code Shortcuts (Mac)", list: vsCodeShortchutMac },
        { name: "macOS Shortcuts", list: macOsShortcut },
        { name: "Cursor Shortcuts", list: cursorShortcut }
      ];
    const handlePickShortcutList = (list: { key: string; command: string; }[]) => {
        setShortcutList(list);
        console.log(shortcutList);
        
    }
    return (
        <div className={theme}>
        <Header  />

        <BrowserShortcut />

        <div className={`container `}>
            <div className='top-section'>
            <CommandPallet />
            <Hero gameStarted={gameStarted}/>
            </div>
            <div className='main-content'>
                <div className='hotkey-section'>
                    <Hotkey
                        gameStarted={gameStarted}
                        currentShortcutIndex={currentShortcutIndex}
                        setCurrentShortcutIndex={setCurrentShortcutIndex}
                        setInputHistory={setInputHistory} 
                        inputHistory={inputHistory}
                        shortcutList={shortcutList}
                        setGameStarted={setGameStarted}
                        initialTime={initialTime}
                        setInitialTime={setInitialTime}
                        setShortcutList={setShortcutList}
                    />
                </div>
                <div className="control-buttons">
                    <ControlButtons
                        handlePickShortcutList={handlePickShortcutList}
                        handleSkipShortcut={handleSkipShortcut}
                        handleStartRecording={handleStartRecording}
                        handleStopRecording={handleStopRecording}
                        gameStarted={gameStarted}
                        initialTime={initialTime}
                        setInitialTime={setInitialTime}
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
