import React from 'react';

import { Theme } from './types/types';
import './styles/CommandPalette.css';

interface ThemeListProps {
  themes: Theme[];
  onSelect: (themeId: string) => void;
}

export const ThemeList: React.FC<ThemeListProps> = ({ themes, onSelect }) => (
  <ul className="theme-list">
    {themes.map(({ id, name }) => (
      <ul key={id}>
        <button 
          className="theme-option"
          onClick={() => onSelect(id)}
        >
          {name}
        </button>
      </ul>
    ))}
  </ul>
);