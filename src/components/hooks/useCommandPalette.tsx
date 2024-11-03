//#region Imports
import { useState, useCallback } from 'react';
// Types
import { UseCommandPaletteProps } from '../types/types';
//#endregion
export const useCommandPalette = ({ onThemeChange }: UseCommandPaletteProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleThemeSelection = useCallback((themeId: string) => {
    onThemeChange?.(themeId);
    setIsModalOpen(false);
  }, [onThemeChange]);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return {
    isModalOpen,
    handleThemeSelection,
    openModal,
    closeModal,
  };
};