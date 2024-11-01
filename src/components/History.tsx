import React, { useMemo } from 'react';
import { HistoryStats } from './HistoryStats';
import { HistoryItem } from './HistoryItem';
import { HistoryProps } from './types/types';
import './styles/History.css';

const History: React.FC<HistoryProps> = ({ inputHistory, shortcutList }) => {
  const stats = useMemo(() => {
    const completedCount = inputHistory.filter(input => input.status === 'found').length;
    return {
      successRate: inputHistory.length > 0
        ? Math.round((completedCount / inputHistory.length) * 100)
        : 0,
      totalTries: inputHistory.length,
      completedCount,
      totalShortcuts: shortcutList.length
    };
  }, [inputHistory, shortcutList]);

  return (
    <div className="history-wrapper">
      {inputHistory.length > 0 && <HistoryStats {...stats} />}
      <div className="history-section">
        {inputHistory.length > 0 && (
          <ul className='history-list'>
            {[...inputHistory].reverse().map((input, index) => {
              const [shortcut, command] = input.text.split(' - ');
              return (
                <HistoryItem
                  key={index}
                  shortcut={shortcut}
                  command={command}
                  status={input.status}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default History;