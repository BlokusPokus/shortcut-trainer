import React from 'react'
import { usePalletContext } from '../PalletContext';
import ShortcutData from './shortcutData';
import TimeSelector from './TimeSelector';

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
    
    return (
        <div className={`control-buttons ${theme}`}>
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
            <ShortcutData setShortcutList={handlePickShortcutList}/>
            <TimeSelector 
                selectedTime={initialTime}
                onTimeSelect={setInitialTime}
            />
        </div>
    );
};

export default ControlButtons
