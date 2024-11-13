import React, { useState } from 'react';
import {
  vsCodeShortchutMac,
  macOsShortcut,
  browserShortcuts,
  windowsShortcuts,
  commandLineShortcuts,
  //   gitShortcuts,
  vimShortcuts,
  excelShortcuts,
  cursorShortcut,
} from '../constants/shortcutLists';
import './ShortcutList.css';
import Footer from '../layout/Footer';
import { Link } from 'react-router-dom';
import { Grid, Info, Keyboard, List } from 'lucide-react';
import { CommandPalette } from '../themes/CommandPallet';
import { usePalletContext } from '../../PalletContext';
import { DEFAULT_THEMES } from '../constants/defaultThemes';

interface Shortcut {
  key: string;
  command: string;
  description?: string;
}

interface ListInfo {
  name: string;
  shortcuts: Shortcut[];
}

type ListsType = {
  [key: string]: ListInfo;
};

const ShortcutListPage = () => {
  const [selectedList, setSelectedList] = useState<keyof ListsType>('vsCode');
  const [searchTerm, setSearchTerm] = useState('');
  const { theme, setTheme } = usePalletContext();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleThemeChange = (themeId: string) => {
    const selectedTheme = DEFAULT_THEMES.find(theme => theme.id === themeId);
    if (selectedTheme?.className) {
      setTheme(selectedTheme.className);
      localStorage.setItem('theme', selectedTheme.className);
    }
  };
  const lists: ListsType = {
    vsCode: { name: 'VS Code', shortcuts: vsCodeShortchutMac },
    macOS: { name: 'MacOS', shortcuts: macOsShortcut },
    browser: { name: 'Browser', shortcuts: browserShortcuts },
    windows: { name: 'Windows', shortcuts: windowsShortcuts },
    commandLine: { name: 'Command Line', shortcuts: commandLineShortcuts },
    //git: { name: 'Git', shortcuts: gitShortcuts },
    vim: { name: 'Vim', shortcuts: vimShortcuts },
    excel: { name: 'Excel', shortcuts: excelShortcuts },
    cursor: { name: 'Cursor', shortcuts: cursorShortcut },
  };

  const formatShortcutKey = (key: string) => {
    const parts = key.split(/(\+|,|\bthen\b)/g);
    return parts.map((part, index) => {
      const trimmedPart = part.trim();
      if (
        trimmedPart === '+' ||
        trimmedPart === ',' ||
        trimmedPart === 'then'
      ) {
        return (
          <span key={index} className="operator">
            {trimmedPart}
          </span>
        );
      }
      if (trimmedPart) {
        return (
          <span key={index} className="keycap">
            {trimmedPart}
          </span>
        );
      }
      return null;
    });
  };
  const filteredShortcuts = lists[selectedList].shortcuts.filter(
    (shortcut: Shortcut) =>
      shortcut.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shortcut.command.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={theme}>
      <div className="top-bar">
        <CommandPalette
          onThemeChange={handleThemeChange}
          currentTheme={theme}
        />

        <div className="search-section">
          <input
            type="text"
            className="search-bar"
            placeholder="Search shortcuts..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button
            className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid size={20} />
          </button>
          <button
            className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List size={20} />
          </button>
        </div>

        <Link to="/" className="logo-home">
          <Keyboard size={24} />
          <span className="logo-text">Trainer</span>
        </Link>
      </div>

      <div className="shortcut-list-page">
        <div className="shortcut-header">
          <div className="list-selector">
            {Object.entries(lists).map(([key, value]) => (
              <button
                key={key}
                className={`list-button ${selectedList === key ? 'selected' : ''}`}
                onClick={() => setSelectedList(key as keyof ListsType)}
              >
                {value.name}
              </button>
            ))}
          </div>
        </div>

        <div className={`shortcuts-container ${viewMode}`}>
          {filteredShortcuts.map((shortcut: Shortcut, index: number) =>
            viewMode === 'grid' ? (
              <div className="shortcut-card" key={index}>
                <Info className="info-icon" size={16} />
                <div className="info-tooltip">
                  {shortcut.description ||
                    'No additional information available'}
                </div>
                <div className="shortcut-command">{shortcut.command}</div>
                <div className="shortcut-key">
                  {formatShortcutKey(shortcut.key)}
                </div>
              </div>
            ) : (
              <div className="shortcut-list-item" key={index}>
                <div className="shortcut-command">{shortcut.command}</div>
                {shortcut.description && (
                  <Info className="info-icon" size={16} />
                )}
                <div className="shortcut-key">
                  {formatShortcutKey(shortcut.key)}
                </div>
              </div>
            )
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ShortcutListPage;
