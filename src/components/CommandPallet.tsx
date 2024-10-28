import React, { useState } from 'react'
import Modal from './common/modal'
import { usePalletContext } from '../PalletContext';
import './themes.css'
import './CommandPallet.css'
const CommandPallet = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { theme, setTheme } = usePalletContext();

    const AllPallets = ['vscode', 'mountain', 'red-season', 'pink-sky', 'default', 'mkbhd', 'mocha', 'coral', 'ocean', 'azure', 'forest', 'rose-milk', 'amethyst', 'amber', 'terminal']
  
    const handlePalletSelection = (pallet: string): void => {
      setTheme(pallet);
      setIsModalOpen(false);
    }

    return (
      <div className="command-pallet">
        <button onClick={() => setIsModalOpen(true)}>Change theme</button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Choose Theme">
          <ul className='command-pallet-list'>
            {AllPallets.map((pallet) => (
              <button key={pallet} onClick={() => handlePalletSelection(pallet)}>{pallet}</button>
            ))}
          </ul>
        </Modal>
      </div>
    )
}

export default CommandPallet
