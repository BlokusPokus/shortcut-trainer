import { act } from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import History from '../History';
import { InputHistoryItem, Shortcut } from '../../types/types';

describe('History', () => {
  const mockShortcuts: Shortcut[] = [
    { key: 'Ctrl+C', command: 'Copy', listId: '1' },
    { key: 'Ctrl+V', command: 'Paste', listId: '2' },
  ];

  test('calculates stats correctly with mixed results', () => {
    const mockHistory: InputHistoryItem[] = [
      { text: 'Ctrl+C - Copy', status: 'found' },
      { text: 'Ctrl+V - Paste', status: 'wrong' },
      { text: 'Ctrl+C - Copy', status: 'found' },
      { text: 'Ctrl+V - Paste', status: 'skipped' },
    ];

    render(
      <History
        inputHistory={mockHistory}
        shortcutList={mockShortcuts}
        gameStarted={true}
        setGameStarted={jest.fn()}
      />
    );

    expect(screen.getByText('Success Rate: 50%')).toBeInTheDocument();
    expect(screen.getByText('Total tries: 4')).toBeInTheDocument();
    expect(screen.getByText('Completed Shortcuts: 2/2')).toBeInTheDocument();
  });

  test('shows empty state when no history', () => {
    render(
      <History
        inputHistory={[]}
        shortcutList={mockShortcuts}
        gameStarted={true}
        setGameStarted={jest.fn()}
      />
    );

    expect(
      screen.getByText('No history yet. Start typing shortcuts!')
    ).toBeInTheDocument();
  });
});
