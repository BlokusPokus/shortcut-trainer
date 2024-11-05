//#region Imports and Third-party Libraries
import React from 'react';
// Types
import { HeaderProps } from '../types/types';
//#endregion

const Header = ({ gameStarted }: HeaderProps) => {
  return (
    <div className={`intro-text-container ${gameStarted ? 'hidden' : ''}`}>
      <div className="intro-text">
        don't bang your head too hard. your goal is to practice your shortcut
        skills.
      </div>
    </div>
  );
};

export default Header;
