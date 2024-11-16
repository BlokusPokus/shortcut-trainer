import { Dispatch, SetStateAction } from 'react';

// Used in: MainContent.tsx, Hotkey.tsx
export interface GameStateProps {
  gameStarted: boolean;
  setGameStarted: Dispatch<SetStateAction<boolean>>;
  currentShortcutIndex: number;
  setCurrentShortcutIndex: Dispatch<SetStateAction<number>>;
  inputHistory: InputHistoryItem[];
  setInputHistory: Dispatch<SetStateAction<InputHistoryItem[]>>;
  shortcutList: Shortcut[];
  setShortcutList: Dispatch<SetStateAction<Shortcut[]>>;
  initialTime: number;
  setInitialTime: Dispatch<SetStateAction<number>>;
}

// Used in: MainContent.tsx
export interface MainContentProps extends GameStateProps {
  theme: string;
  handleThemeChange: (themeId: string) => void;
}

// Used in: GameStateProps, GameHistoryProps
export interface InputHistoryItem {
  text: string;
  status: 'skipped' | 'found' | 'wrong';
}

// Used in: GameStateProps, ControlButtonsProps, shortcutData.tsx
export interface Shortcut {
  key: string;
  command: string;
  listId: string;
}

// Used in: Hotkey.tsx
export type HotkeyProps = GameStateProps;

// Used in: FlipCard.tsx
export interface FlipCardProps {
  command: string;
  shortcutKey: string;
}

// Used in: Instructions component (not shown in provided code)
export interface InstructionsProps {
  listName: string;
  initialTime: number;
}

// Used in: ThemeSelectionProps, themes.css
export interface Theme {
  id: string;
  name: string;
  description?: string;
  className?: string;
}

// Used in: CommandPaletteProps
export interface ThemeSelectionProps {
  themes?: Theme[];
  currentTheme?: string;
}

// Used in: CommandPalette.tsx
export interface CommandPaletteProps extends ThemeSelectionProps {
  onThemeChange: (themeId: string) => void;
}

// Used in: ControlButtons.tsx
export interface ControlButtonsProps {
  handleStartRecording: () => void;
  handleStopRecording: () => void;
  gameStarted: boolean;
  handleSkipShortcut: () => void;
  handlePickShortcutList: (list: Shortcut[]) => void;
  initialTime: number;
  setInitialTime: (time: number) => void;
}

// Used in: History component, UseGameEndProps
export type GameHistoryProps = {
  inputHistory: InputHistoryItem[];
  shortcutList: Shortcut[];
  gameStarted: boolean;
  setGameStarted: Dispatch<SetStateAction<boolean>>;
};

// Used in: HistoryStats component
export interface HistoryStatsProps {
  successRate: number;
  totalTries: number;
  completedCount: number;
  totalShortcuts: number;
}

// Used in: HistoryItem component
export interface HistoryItemProps {
  shortcut: string;
  command: string;
  status: InputHistoryItem['status'];
  isLatest?: boolean;
  isMac?: boolean;
}

// Used in: TimeSelector component
export interface TimeSelectorProps {
  selectedTime: number;
  onTimeSelect: (time: number) => void;
  gameStarted: boolean;
}

// Used in: shortcutData.tsx
export interface ShortcutDataProps {
  setShortcutList: (list: Shortcut[]) => void;
}

// Used in: Timer component
export interface TimerProps {
  delayResend: number;
  gameStarted: boolean;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  onTimeUpdate?: (remainingTime: number) => void;
}

// Used in: useTimer hook
export interface UseTimerProps {
  initialTime: number;
  gameStarted: boolean;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  onTimeEnd?: () => void;
}

// Used in: History component
export type HistoryProps = GameHistoryProps;

// Used in: useGameEnd hook
export type UseGameEndProps = GameHistoryProps;

// Used in: Header.tsx
export interface HeaderProps {
  gameStarted: boolean;
  showBackButton?: boolean;
}

// Used in: Footer.tsx
export interface FooterProps {
  githubUrl?: string;
  twitterHandle?: string;
  authorGithub?: string;
}

export interface UseCommandPaletteProps {
  onThemeChange: (themeId: string) => void;
}

export interface UseTimerReturn {
  currentTime: number;
  formattedTime: string;
  setTime: (time: number) => void;
  resetTimer: () => void;
}
export interface ThemeListProps {
  themes: Theme[];
  onSelect: (id: string) => void;
  currentTheme?: string;
}
