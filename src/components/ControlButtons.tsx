import React from 'react'

interface ControlButtonsProps {
    handleStartRecording: () => void;
    handleStopRecording: () => void;
    gameStarted: boolean;
    handleSkipShortcut: () => void;
    handlePickShortcutList: () => void;
}

const ControlButtons = ({handleStartRecording,handleStopRecording,handleSkipShortcut,handlePickShortcutList,gameStarted}:ControlButtonsProps) => {
  
    return (
    <div>
        <div className="control-buttons">
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
    <button 
        onClick={handlePickShortcutList} 
        disabled={gameStarted}
        className={gameStarted ? 'disabled' : ''}
    >
        Pick a shortcut list
    </button>
    </div>
    </div>
  )
};

export default ControlButtons