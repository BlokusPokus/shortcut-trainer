

import React, { useState } from 'react'
import Modal from './common/modal'
import './styles/ShortcutData.css'
import { List } from 'lucide-react';
import { vsCodeShortchutMac, macOsShortcut, cursorShortcut, vimShortcuts, excelShortcuts, commandLineShortcuts, gitShortcuts, windowsShortcuts } from './shortcutLists';

interface ShortcutDataProps {
    setShortcutList: (list: { key: string; command: string; }[]) => void;
}

export const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};
    
const ShortcutData = ({setShortcutList}: ShortcutDataProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const shortcutLists = [
        { name: "VS Code Shortcuts (Mac)", list: vsCodeShortchutMac },
        { name: "macOS Shortcuts", list: macOsShortcut },
        { name: "Cursor Shortcuts", list: cursorShortcut },
        { name: "vimShortcuts", list: vimShortcuts },
        { name: "excelShortcuts", list: excelShortcuts },
        { name: "commandLineShortcuts", list: commandLineShortcuts },
        { name: "gitShortcuts", list: gitShortcuts },
        { name: "windowsShortcuts", list: windowsShortcuts }
    ];

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}><List/></button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Pick list">
                {shortcutLists.map((item, index) => (
                    <button 
                        key={index} 
                        onClick={() => {
                            setShortcutList(shuffleArray(item.list)); 
                            setIsModalOpen(false);
                        }}
                    >
                        {item.name}
                    </button>
                ))}
            </Modal>
        </div>
    )
}

export default ShortcutData;
