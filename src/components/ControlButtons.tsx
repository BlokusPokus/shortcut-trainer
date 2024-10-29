import React from 'react'
import { usePalletContext } from '../PalletContext';
import ShortcutData from './shortcutData';
import TimeSelector from './TimeSelector';
import { Play, StopCircle, SkipForward, Square } from 'lucide-react';
import './ControlButtons.css'

interface ControlButtonsProps {
    handleStartRecording: () => void;
    handleStopRecording: () => void;
    gameStarted: boolean;
    handleSkipShortcut: () => void;
    handlePickShortcutList: (list: { key: string; command: string; }[]) => void;
    // Add time-related props
    initialTime: number;
    setInitialTime: (time: number) => void;
}

const ControlButtons = ({
    handleStartRecording,
    handleStopRecording,
    handleSkipShortcut,
    handlePickShortcutList,
    gameStarted,
    initialTime,
    setInitialTime
}: ControlButtonsProps) => {
    const { theme } = usePalletContext();
    
    console.log('ControlButtons render - initialTime:', initialTime, 'gameStarted:', gameStarted);
    
    return (
        <div className={`control-buttons ${theme}`}>
            <button 
                onClick={handleStartRecording} 
                disabled={gameStarted}
                className={gameStarted ? 'disabled' : ''}
            >
                <Play />
            </button>
            <button 
                onClick={handleStopRecording} 
                disabled={!gameStarted}
                className={!gameStarted ? 'disabled' : ''}
            >
                <Square />
            </button>
            <button 
                onClick={handleSkipShortcut} 
                disabled={!gameStarted}
                className={!gameStarted ? 'disabled' : ''}
            >
                <SkipForward />
            </button>
            <ShortcutData setShortcutList={handlePickShortcutList}/>
            <TimeSelector 
                selectedTime={initialTime}
                onTimeSelect={setInitialTime}
                gameStarted={gameStarted}
            />
        </div>
    );
};

export default ControlButtons
