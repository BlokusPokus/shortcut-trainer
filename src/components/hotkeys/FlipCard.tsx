//#region Imports
import React from 'react';
import { FlipCardProps } from '../types/types';
//#endregion

export const FlipCard: React.FC<FlipCardProps> = ({ command, shortcutKey }) => (
  <div className="flip-card">
    <div className="flip-card-inner">
      <div className="flip-card-front">
        <h2 className="action-command">{command}</h2>
      </div>
      <div className="flip-card-back">
        <p className="action-key">{shortcutKey}</p>
      </div>
    </div>
  </div>
);
