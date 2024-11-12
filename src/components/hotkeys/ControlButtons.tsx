//#region Imports
// React and Third-party Libraries
import React from 'react';
import { Play, Square, SkipForward, List, Scroll } from 'lucide-react';
// Hooks and Context
import { usePalletContext } from '../../PalletContext';
// Components
import { GameButton } from '../common/gameButtons';
import ShortcutData from './shortcutData';
import TimeSelector from '../time/TimeSelector';
// Types
import { ControlButtonsProps } from '../types/types';
// Styles
import '../styles/ControlButtons.css';
import { useNavigate } from 'react-router-dom';
//#endregion

const ControlButtons: React.FC<ControlButtonsProps> = ({
  handleStartRecording,
  handleStopRecording,
  handleSkipShortcut,
  handlePickShortcutList,
  gameStarted,
  initialTime,
  setInitialTime,
}) => {
  const { theme } = usePalletContext();
  const navigate = useNavigate();

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
      <ShortcutData setShortcutList={handlePickShortcutList} />
      <TimeSelector
        selectedTime={initialTime}
        onTimeSelect={setInitialTime}
        gameStarted={gameStarted}
      />
      <GameButton
        onClick={() => navigate('/shortcut-list')}
        disabled={false}
        Icon={Scroll}
      />
    </div>
  );
};

export default ControlButtons;
