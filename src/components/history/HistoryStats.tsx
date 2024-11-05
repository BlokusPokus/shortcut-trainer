//#region Imports and Third-party Libraries
import React from 'react';
import { HistoryStatsProps } from '../types/types';
//#endregion
export const HistoryStats: React.FC<HistoryStatsProps> = ({
  successRate,
  totalTries,
  completedCount,
  totalShortcuts,
}) => (
  <div className="success-rate">
    <div>Success Rate: {successRate}%</div>
    <div className="length">Total tries: {totalTries}</div>
    <div className="completed">
      Completed Shortcuts: {completedCount}/{totalShortcuts}
    </div>
  </div>
);
