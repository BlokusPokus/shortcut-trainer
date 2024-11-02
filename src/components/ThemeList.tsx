import React from 'react';

import { Theme } from './types/types';
import './styles/CommandPalette.css';

interface ThemeListProps {
  themes: Theme[];
  onSelect: (themeId: string) => void;
  currentTheme?: string;
}

export const ThemeList: React.FC<ThemeListProps> = ({ themes, onSelect, currentTheme }) => (
  <ul className="theme-list">
    {themes.map(({ id, name }) => (
      <ul key={id}>
        <button 
          className={`theme-option ${currentTheme === id ? 'selected' : ''}`}
          onClick={() => onSelect(id)}
        >
          {name}
        </button>
      </ul>
    ))}
  </ul>
);