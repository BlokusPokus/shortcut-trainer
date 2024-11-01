import React from 'react';
import { Play, Square, SkipForward } from 'lucide-react';

import './styles/ControlButtons.css';
import { ControlButtonsProps } from './types/types';
import { usePalletContext } from '../PalletContext';
import { GameButton } from './common/gameButtons';
import ShortcutData from './shortcutData';
import TimeSelector from './TimeSelector';

const ControlButtons: React.FC<ControlButtonsProps> = ({
    handleStartRecording,
    handleStopRecording,
    handleSkipShortcut,
    handlePickShortcutList,
    gameStarted,
    initialTime,
    setInitialTime
}) => {
    const { theme } = usePalletContext();

    return (
        <div className={`control-buttons ${theme}`}>
            <GameButton 
                onClick={handleStartRecording}
                disabled={gameStarted}
                Icon={Play}
            />
            <GameButton 
                onClick={handleStopRecording}
                disabled={!gameStarted}
                Icon={Square}
            />
            <GameButton 
                onClick={handleSkipShortcut}
                disabled={!gameStarted}
                Icon={SkipForward}
            />
            <ShortcutData setShortcutList={handlePickShortcutList}/>
            <TimeSelector 
                selectedTime={initialTime}
                onTimeSelect={setInitialTime}
                gameStarted={gameStarted}
            />
        </div>
    );
};

export default ControlButtons;
