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
import { Grid, Info, Keyboard, Laptop, List } from 'lucide-react';
import { CommandPalette } from '../themes/CommandPallet';
import { usePalletContext } from '../../PalletContext';
import { DEFAULT_THEMES } from '../constants/defaultThemes';
import { formatKeyString } from '../hotkeys/keyFormatter';
import { shortcutCategories } from '../hotkeys/ShortcutCategories';

// Add these new interfaces
interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}

interface Shortcut {
  key: string;
  command: string;
  description?: string;
}

interface ListInfo {
  name: string;
  shortcuts: Shortcut[];
  os: 'mac' | 'windows' | 'both';
}

type ListsType = {
  [key: string]: ListInfo;
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  return (
    <div className="category-filter">
      {categories.map(category => (
        <label key={category} className="category-label">
          <input
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={() => onCategoryChange(category)}
          />
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </label>
      ))}
    </div>
  );
};
const ShortcutListPage = () => {
  const [selectedList, setSelectedList] = useState<keyof ListsType>('vsCode');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const { theme, setTheme } = usePalletContext();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMac, setIsMac] = useState(() => {
    const stored = localStorage.getItem('isMac');
    return stored
      ? JSON.parse(stored)
      : navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      }
      return [...prev, category];
    });
  };
  const osSpecificLists = {
    mac: ['macOS'],
    windows: ['windows'],
  };
  const handleThemeChange = (themeId: string) => {
    const selectedTheme = DEFAULT_THEMES.find(theme => theme.id === themeId);
    if (selectedTheme?.className) {
      setTheme(selectedTheme.className);
      localStorage.setItem('theme', selectedTheme.className);
    }
  };
  const lists: ListsType = {
    windows: { name: 'Windows', shortcuts: windowsShortcuts, os: 'windows' },
    macOS: { name: 'MacOS', shortcuts: macOsShortcut, os: 'mac' },
    browser: { name: 'Browser', shortcuts: browserShortcuts, os: 'both' },
    vsCode: { name: 'VS Code', shortcuts: vsCodeShortchutMac, os: 'both' },
    commandLine: {
      name: 'Command Line',
      shortcuts: commandLineShortcuts,
      os: 'both',
    },
    vim: { name: 'Vim', shortcuts: vimShortcuts, os: 'both' },
    excel: { name: 'Excel', shortcuts: excelShortcuts, os: 'both' },
    cursor: { name: 'Cursor', shortcuts: cursorShortcut, os: 'both' },
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
            {formatKeyString(trimmedPart, isMac)}
          </span>
        );
      }
      return null;
    });
  };
  const filteredShortcuts = lists[selectedList].shortcuts.filter(
    (shortcut: Shortcut) => {
      const matchesSearch =
        shortcut.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shortcut.command.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.some(category =>
          shortcut.command.toLowerCase().includes(category.toLowerCase())
        );

      return matchesSearch && matchesCategories;
    }
  );

  return (
    <div className={theme}>
      <div>
        <div className="top-bar">
          <div className="search-section">
            <div className="logo-container">
              <Link to="/" className="logo-home">
                <Keyboard size={24} />
                <span className="logo-text">Trainer</span>
              </Link>
            </div>

            <input
              type="text"
              className="search-bar"
              placeholder="Search shortcuts..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />

            <div className="controls-group">
              <button
                className="view-toggle"
                onClick={() => {
                  setIsMac(!isMac);
                  localStorage.setItem('isMac', JSON.stringify(!isMac));
                }}
                title={`Switch to ${isMac ? 'Windows' : 'Mac'} shortcuts`}
              >
                <Laptop size={20} />
                {isMac ? 'Mac' : 'Win'}
              </button>
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

            <CommandPalette
              onThemeChange={handleThemeChange}
              currentTheme={theme}
            />
          </div>
        </div>
      </div>

      <div className="shortcut-list-page">
        <div className="shortcut-header">
          <div className="list-selector">
            {Object.entries(lists).map(([key, value]) => {
              const isCompatible =
                value.os === 'both' ||
                (isMac ? value.os === 'mac' : value.os === 'windows');

              return (
                <button
                  key={key}
                  className={`list-button ${selectedList === key ? 'selected' : ''}`}
                  onClick={() => setSelectedList(key as keyof ListsType)}
                  disabled={!isCompatible}
                  title={
                    !isCompatible
                      ? `Only available for ${value.os === 'mac' ? 'MacOS' : 'Windows'}`
                      : ''
                  }
                >
                  {value.name}
                </button>
              );
            })}
          </div>
          {shortcutCategories[
            selectedList as keyof typeof shortcutCategories
          ] && (
            <CategoryFilter
              categories={
                shortcutCategories[
                  selectedList as keyof typeof shortcutCategories
                ]
              }
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          )}
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
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ShortcutListPage;
