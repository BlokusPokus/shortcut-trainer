//#region Imports and Third-party Libraries
import React, { useMemo } from 'react';
// Components
import { HistoryStats } from '../history/HistoryStats';
import { HistoryItem } from '../history/HistoryItem';
// Types
import { HistoryProps } from '../types/types';
// Styles
import '../styles/History.css';
// Hooks and Context
import { useGameEnd } from '../hooks/useGameEnd';
import { useOsDetection } from '../hotkeys/useOsDetection';
//#endregion

const History: React.FC<HistoryProps> = ({
  inputHistory,
  shortcutList,
  gameStarted,
  setGameStarted,
}) => {
  const { isMac } = useOsDetection();

  const stats = useMemo(() => {
    const completedCount = inputHistory.filter(
      input => input.status === 'found'
    ).length;
    return {
      successRate:
        inputHistory.length > 0
          ? Math.round((completedCount / inputHistory.length) * 100)
          : 0,
      totalTries: inputHistory.length,
      completedCount,
      totalShortcuts: shortcutList.length,
    };
  }, [inputHistory, shortcutList]);

  useGameEnd({ inputHistory, shortcutList, gameStarted, setGameStarted });

  return (
    <div className="history-wrapper">
      {inputHistory.length > 0 && <HistoryStats {...stats} />}
      <div className="history-section">
        {inputHistory.length > 0 ? (
          <ul className="history-list">
            {[...inputHistory].reverse().map((input, index) => {
              const [shortcut, command] = input.text.split(' - ');
              return (
                <HistoryItem
                  key={`history-${index}-${shortcut}`}
                  shortcut={shortcut}
                  command={command}
                  status={input.status}
                  isLatest={index === 0}
                  isMac={isMac}
                />
              );
            })}
          </ul>
        ) : (
          <div className="empty-history">
            <p>No history yet. Start typing shortcuts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
