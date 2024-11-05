import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useHotkeyLogic } from '../useHotkeyLogic';

const mockStartRecording = jest.fn();
const mockStopRecording = jest.fn();
const mockResetKeys = jest.fn();

// Mock react-hotkeys-hook at the top level
jest.mock('react-hotkeys-hook', () => ({
  useRecordHotkeys: () => [
    new Set(['Ctrl', 'C']),
    {
      start: mockStartRecording,
      stop: mockStopRecording,
      resetKeys: mockResetKeys,
    },
  ],
}));

describe('useHotkeyLogic', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const mockProps = {
    gameStarted: true,
    currentShortcutIndex: 0,
    setCurrentShortcutIndex: jest.fn(),
    setInputHistory: jest.fn(),
    shortcutList: [
      { key: 'Ctrl+C', command: 'Copy', listId: '1' },
      { key: 'Ctrl+V', command: 'Paste', listId: '2' },
    ],
    setShortcutList: jest.fn(),
  };

  test('processes correct shortcut input', () => {
    renderHook(() => useHotkeyLogic(mockProps));

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(mockProps.setInputHistory).toHaveBeenCalled();
    expect(mockProps.setCurrentShortcutIndex).toHaveBeenCalled();
  });

  test('handles game start/stop correctly', () => {
    const { rerender } = renderHook(props => useHotkeyLogic(props), {
      initialProps: { ...mockProps, gameStarted: false },
    });

    expect(mockStopRecording).toHaveBeenCalled();

    rerender({ ...mockProps, gameStarted: true });
    expect(mockStartRecording).toHaveBeenCalled();
    expect(mockResetKeys).toHaveBeenCalled();
  });
});
