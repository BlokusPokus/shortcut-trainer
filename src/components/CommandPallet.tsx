import React from 'react';
import { Palette } from 'lucide-react';
import { useCommandPalette } from './hooks/useCommandPalette';
import { ThemeList } from './ThemeList';
import Modal from './common/modal';
import { CommandPaletteProps } from './types/types';
import { DEFAULT_THEMES } from './constants/defaultThemes';
import './styles/CommandPalette.css';

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