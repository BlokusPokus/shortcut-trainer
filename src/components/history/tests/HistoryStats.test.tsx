import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HistoryStats } from '../HistoryStats';
import { HistoryStatsProps } from '../../types/types';

test('renders stats correctly', () => {
  const stats: HistoryStatsProps = {
    successRate: 80,
    totalTries: 10,
    completedCount: 8,
    totalShortcuts: 10,
  };

  render(<HistoryStats {...stats} />);

  expect(screen.getByText('Success Rate: 80%')).toBeInTheDocument();
  expect(screen.getByText('Total tries: 10')).toBeInTheDocument();
  expect(screen.getByText('Completed Shortcuts: 8/10')).toBeInTheDocument();
});
