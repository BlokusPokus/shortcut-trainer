//#region Imports
import React from 'react';
// Types
import { ThemeListProps } from '../types/types';
// Styles
//#endregion

export const ThemeList: React.FC<ThemeListProps> = ({
  themes,
  onSelect,
  currentTheme,
}) => (
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
