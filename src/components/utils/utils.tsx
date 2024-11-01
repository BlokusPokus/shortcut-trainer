import { Shortcut } from '../types/types';

export type ListNameState = string;

export type ListNameAction = {
  type: 'SET_LIST_NAME';
  payload: {
    shortcuts: Shortcut[];
    listId: string;
  };
};

export const SHORTCUT_LISTS = {
  VS_CODE: 'VS Code Shortcuts',
  MACOS: 'MacOS Shortcuts',
  COMMAND_LINE: 'Command Line Shortcuts',
  VIM: 'Vim Shortcuts',
  EXCEL: 'Excel Shortcuts',
  GIT: 'Git Shortcuts',
  WINDOWS: 'Windows Shortcuts',
  CURSOR: 'Cursor Shortcuts',
  CUSTOM: 'Custom Shortcuts'
} as const;

export const listNameReducer = (state: ListNameState, action: ListNameAction): ListNameState => {
  switch (action.type) {
    case 'SET_LIST_NAME': {
      const { shortcuts, listId } = action.payload;
      if (!shortcuts || shortcuts.length === 0) return SHORTCUT_LISTS.CUSTOM;
      
      return SHORTCUT_LISTS[listId as keyof typeof SHORTCUT_LISTS] || SHORTCUT_LISTS.CUSTOM;
    }
    default:
      return state;
  }
};