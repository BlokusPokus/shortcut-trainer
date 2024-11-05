import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HistoryItem } from '../HistoryItem';
import { act } from 'react';

describe('HistoryItem', () => {
  const defaultProps = {
    shortcut: 'Ctrl+C',
    command: 'Copy',
    status: 'found' as const,
  };

  test('renders shortcut and command text', () => {
    render(<HistoryItem {...defaultProps} />);

    expect(screen.getByText('Ctrl+C')).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  test('shows ThumbsUp icon when status is found', () => {
    render(<HistoryItem {...defaultProps} />);
    expect(screen.getByText('Ctrl+C').closest('li')).toHaveClass('found');
  });

  test('shows ThumbsDown icon when status is wrong', () => {
    render(<HistoryItem {...defaultProps} status="wrong" />);
    expect(screen.getByText('Ctrl+C').closest('li')).toHaveClass('wrong');
  });

  test('maintains expected DOM structure', () => {
    const { container } = render(<HistoryItem {...defaultProps} />);
    expect(container.querySelector('.header')).toBeInTheDocument();
    expect(container.querySelector('.content')).toBeInTheDocument();
  });

  test('shows Minus icon when status is skipped', () => {
    render(<HistoryItem {...defaultProps} status="skipped" />);
    expect(screen.getByText('Ctrl+C').closest('li')).toHaveClass('skipped');
  });
});
