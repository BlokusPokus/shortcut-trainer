//#region Imports
// React and Third-party Libraries
import React from 'react';
import { List, Play, Timer as TimerIcon } from 'lucide-react';
// Types
import { InstructionsProps } from './types/types';
// Constants
import { TIME_OPTIONS } from './constants/timeOptions';
// Styles
import './styles/Instructions.css';
//#endregion
export const getTimeLabel = (time: number): string => {
  const option = TIME_OPTIONS.find(opt => opt.value === time);
  return option?.label || `${time}s`;
};

export const Instructions: React.FC<InstructionsProps> = ({ listName, initialTime }) => (
  <div>
    <p>Press <Play/> to begin</p>
    <p>Press <List/> to pick a shortcut list. currently: <span className="highlight-text">{listName}</span></p>
    <p>Press <TimerIcon/> to set the timer. current time: <span className="highlight-text">{getTimeLabel(initialTime)}</span></p>
  </div>
);