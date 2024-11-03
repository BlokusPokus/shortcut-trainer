//#region Imports and Third-party Libraries
import React from 'react';
import { ThumbsDown, ThumbsUp, Minus } from 'lucide-react';
// Types
import { HistoryItemProps } from './types/types';
//#endregion
export const HistoryItem: React.FC<HistoryItemProps> = ({
  shortcut,
  command,
  status
}) => (
  <li className={`singleInputHistory ${status}`}>
    <div className="header">
      {status === 'wrong' ? <ThumbsDown /> : 
       status === 'skipped' ? <Minus /> : 
       <ThumbsUp />}
    </div>
    <div className="content">
      <div className="shortcut">{shortcut}</div>
      <div className="command">{command}</div>
    </div>
  </li>
);