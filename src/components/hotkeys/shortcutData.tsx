//#region Imports
// React and Third-party Libraries
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
// Components
import Modal from '../common/modal';
// Styles
import '../styles/ShortcutData.css';
// Constants
import {
  vsCodeShortchutMac,
  macOsShortcut,
  cursorShortcut,
  vimShortcuts,
  excelShortcuts,
  commandLineShortcuts,
  gitShortcuts,
  windowsShortcuts,
  browserShortcuts,
} from '../constants/shortcutLists';
// Types
import { Shortcut, ShortcutDataProps } from '../types/types';

//#endregion

export const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const ShortcutData = ({ setShortcutList }: ShortcutDataProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<string | null>(null);

  const shortcutLists = [
    {
      id: 'VS_CODE',
      name: 'VS Code Shortcuts (Mac)',
      list: vsCodeShortchutMac.map(item => ({ ...item, listId: 'VS_CODE' })),
    },
    {
      id: 'MACOS',
      name: 'macOS Shortcuts',
      list: macOsShortcut.map(item => ({ ...item, listId: 'MACOS' })),
    },
    {
      id: 'CURSOR',
      name: 'Cursor Shortcuts',
      list: cursorShortcut.map(item => ({ ...item, listId: 'CURSOR' })),
    },
    {
      id: 'VIM',
      name: 'Vim Shortcuts',
      list: vimShortcuts.map(item => ({ ...item, listId: 'VIM' })),
    },
    {
      id: 'EXCEL',
      name: 'Excel Shortcuts',
      list: excelShortcuts.map(item => ({ ...item, listId: 'EXCEL' })),
    },
    {
      id: 'COMMAND_LINE',
      name: 'Command Line Shortcuts',
      list: commandLineShortcuts.map(item => ({
        ...item,
        listId: 'COMMAND_LINE',
      })),
    },
    {
      id: 'GIT',
      name: 'Git Shortcuts',
      list: gitShortcuts.map(item => ({ ...item, listId: 'GIT' })),
    },
    {
      id: 'WINDOWS',
      name: 'Windows Shortcuts',
      list: windowsShortcuts.map(item => ({ ...item, listId: 'WINDOWS' })),
    },
    {
      id: 'BROWSER',
      name: 'Browser Shortcuts',
      list: browserShortcuts.map(item => ({ ...item, listId: 'BROWSER' })),
    },
  ];

  const handleListSelect = (list: Shortcut[], id: string) => {
    setSelectedList(id);
    setShortcutList(shuffleArray(list));
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        <Menu />
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Pick list"
      >
        <div className="shortcut-list">
          {shortcutLists.map(item => (
            <button
              key={item.id}
              className={`shortcut-option ${selectedList === item.id ? 'selected' : ''}`}
              onClick={() => handleListSelect(item.list, item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ShortcutData;
