import React from 'react'
import { usePalletContext } from '../PalletContext';
import ShortcutData from './shortcutData';

interface ControlButtonsProps {
    handleStartRecording: () => void;
    handleStopRecording: () => void;
    gameStarted: boolean;
    handleSkipShortcut: () => void;
    handlePickShortcutList: (list: { key: string; command: string; }[]) => void;
}

const ControlButtons = ({handleStartRecording,handleStopRecording,handleSkipShortcut,handlePickShortcutList,gameStarted}:ControlButtonsProps) => {
    const { theme } = usePalletContext();
    
    return (
    <div>
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
    </div>
    </div>
  )
};

export default ControlButtons
