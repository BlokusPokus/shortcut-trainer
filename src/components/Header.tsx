import React from 'react'
import CommandPallet from './CommandPallet'
import { usePalletContext } from '../PalletContext';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
  const { theme } = usePalletContext();
  return (
    <div className={`header ${theme}`}>
      <CommandPallet />



    </div>
  )
}

export default Header
