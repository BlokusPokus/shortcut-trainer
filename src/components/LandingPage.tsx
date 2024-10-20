import React, { useState } from 'react';
import './LandingPage.css';
import Hotkeytest from './hotkeytest';
import { useRef } from 'react';

const LandingPage = () => {
    const [gameStarted, setGameStarted] = useState(false);

    const handleStartRecording = () => {
        setGameStarted(true);
    };

    const handleStopRecording = () => {
        setGameStarted(false);
    };

    const handleSkipShortcut = () => {

    };

    return (
        <div className='container'>
            <div className="top-section">
                <div>don't bang your head too hard. your goal is to practice your shortcut skills.</div>
                <div>What's the shortcut for: </div>
                <Hotkeytest gameStarted={gameStarted} />
            </div>
            <div className="middle-section">
                <button onClick={handleStartRecording} disabled={gameStarted}>Start</button>
                <button onClick={handleStopRecording} disabled={!gameStarted}>Stop</button>
                <button onClick={handleSkipShortcut} disabled={!gameStarted}>Skip</button>
            </div>
            {/* The bottom section will be rendered by Hotkeytest */}
        </div>
    );
}

export default LandingPage;
