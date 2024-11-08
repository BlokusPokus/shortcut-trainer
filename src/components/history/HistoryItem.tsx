//#region Imports and Third-party Libraries
import React from 'react';
import { ThumbsDown, ThumbsUp, Minus } from 'lucide-react';
// Types
import { HistoryItemProps } from '../types/types';
// Styles
import '../styles/History.css';
//#endregion
export const HistoryItem: React.FC<HistoryItemProps> = ({
  shortcut,
  command,
  status,
  isLatest,
}) => (
  <div className="container-history">
    <li className={`singleInputHistory ${isLatest ? 'latest' : ''} ${status}`}>
      <div className={`header `}>
        {status === 'wrong' ? (
          <ThumbsDown />
        ) : status === 'skipped' ? (
          <Minus />
        ) : (
          <ThumbsUp />
        )}
      </div>
      <div className={`content }`}>
        <div className="shortcut">{shortcut}</div>
        <div className="command">{command}</div>
      </div>
    </li>
  </div>
);
