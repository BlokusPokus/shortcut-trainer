//#region Imports and Third-party Libraries
import React from 'react';
import { Palette } from 'lucide-react';
// Hooks and Context
import { useCommandPalette } from './hooks/useCommandPalette';
// Components
import Modal from './common/modal';
import { ThemeList } from './ThemeList';
// Types
import { CommandPaletteProps } from './types/types';
// Constants
import { DEFAULT_THEMES } from './constants/defaultThemes';
// Styles
import './styles/CommandPalette.css';
//#endregion
export const CommandPalette: React.FC<CommandPaletteProps> = ({ 
  themes = DEFAULT_THEMES,
  onThemeChange,
  currentTheme 
}) => {
  const {
    isModalOpen,
    handleThemeSelection,
    openModal,
    closeModal,
  } = useCommandPalette({ onThemeChange });

  return (
    <div className="command-palette">
      <button 
        className="palette-trigger"
        aria-label="Open theme selector"
        onClick={openModal}
      >
        <Palette />
      </button>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title="Choose Theme"
      >
        <ThemeList 
          themes={themes}
          onSelect={handleThemeSelection}
          currentTheme={currentTheme}
        />
      </Modal>
    </div>
  );
};