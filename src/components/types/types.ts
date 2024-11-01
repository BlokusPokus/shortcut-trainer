import { Dispatch, SetStateAction } from 'react';

export interface LandingPageProps {}

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

export interface MainContentProps extends GameStateProps {
    theme: string;
    handleThemeChange: (themeId: string) => void;
  }

export interface InputHistoryItem {
  text: string;
  status: 'skipped' | 'found' | 'wrong';
}

export interface Shortcut {
  key: string;
  command: string;
  listId: string;
}

export interface HotkeyProps {
  gameStarted: boolean;
  currentShortcutIndex: number;
  setCurrentShortcutIndex: Dispatch<SetStateAction<number>>;
  inputHistory: InputHistoryItem[];
  setInputHistory: Dispatch<SetStateAction<InputHistoryItem[]>>;
  shortcutList: Shortcut[];
  setGameStarted: Dispatch<SetStateAction<boolean>>;
  initialTime: number;
  setInitialTime: Dispatch<SetStateAction<number>>;
  setShortcutList: Dispatch<SetStateAction<Shortcut[]>>;
}

export interface FlipCardProps {
  command: string;
  shortcutKey: string;
}

export interface InstructionsProps {
  listName: string;
  initialTime: number;
}

export interface Theme {
    id: string;
    name: string;
    description?: string;
    className?: string;
  }
  
  export interface CommandPaletteProps {
    themes?: Theme[];
    onThemeChange?: (themeId: string) => void;
    currentTheme?: string;
  }
  export interface ControlButtonsProps {
    handleStartRecording: () => void;
    handleStopRecording: () => void;
    gameStarted: boolean;
    handleSkipShortcut: () => void;
    handlePickShortcutList: (list: Shortcut[]) => void;
    initialTime: number;
    setInitialTime: (time: number) => void;
}

export interface HistoryInput {
    text: string;
    status: 'skipped' | 'found' | 'wrong';
  }
  
  export interface HistoryProps {
    inputHistory: HistoryInput[];
    shortcutList: { key: string; command: string; }[];
  }
  
  export interface HistoryStatsProps {
    successRate: number;
    totalTries: number;
    completedCount: number;
    totalShortcuts: number;
  }
  
  export interface HistoryItemProps {
    shortcut: string;
    command: string;
    status: HistoryInput['status'];
  }