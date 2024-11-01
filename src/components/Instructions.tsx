import React from 'react';
import { List, Play, Timer as TimerIcon } from 'lucide-react';
import { InstructionsProps } from './types/types';
import './styles/Instructions.css';

const getTimeLabel = (time: number): string => {
  if (time === Infinity) return 'No limit';
  if (time === 30) return '30 sec';
  if (time === 60) return '1 min';
  if (time === 120) return '2 min';
  if (time === 180) return '3 min';
  if (time === 300) return '5 min';
  return `${time}s`;
};

export const Instructions: React.FC<InstructionsProps> = ({ listName, initialTime }) => (
  <div>
    <p>Press <Play/> to begin</p>
    <p>Press <List/> to pick a shortcut list. currently: <span className="highlight-text">{listName}</span></p>
    <p>Press <TimerIcon/> to set the timer. current time: <span className="highlight-text">{getTimeLabel(initialTime)}</span></p>
  </div>
);