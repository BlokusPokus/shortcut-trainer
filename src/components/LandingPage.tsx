import React, { useState } from 'react';
import './LandingPage.css';
import Hotkeytest from './hotkeytest';
import { shortcutList } from './hotkeytest';
const LandingPage = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [currentShortcutIndex, setCurrentShortcutIndex] = useState(0);

    const handleStartRecording = () => {
        setGameStarted(true);
    };

    const handleStopRecording = () => {
        setGameStarted(false);
    };

    const handleSkipShortcut = () => {
        console.log('handleskip trigerred ')
        setCurrentShortcutIndex((prevIndex) => (prevIndex + 1) % shortcutList.length);
    };

    return (
        <div className='container'>
            <div className="top-section">
                <div>don't bang your head too hard. your goal is to practice your shortcut skills.</div>
                <div>What's the shortcut for: </div>
                <Hotkeytest
                    gameStarted={gameStarted}
                    currentShortcutIndex={currentShortcutIndex}
                    setCurrentShortcutIndex={setCurrentShortcutIndex}
                />
            </div>
            <div className="middle-section">
                <button onClick={handleStartRecording} disabled={gameStarted}>Start</button>
                <button onClick={handleStopRecording} disabled={!gameStarted}>Stop</button>
                <button onClick={handleSkipShortcut} disabled={!gameStarted}>Skip</button>
            </div>
        </div>
    );
}

export default LandingPage;
