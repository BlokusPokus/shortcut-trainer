import React, { useState } from 'react'
import Modal from './common/modal'
import './styles/ShortcutData.css'
import { List } from 'lucide-react';
import { vsCodeShortchutMac, macOsShortcut, cursorShortcut, vimShortcuts, excelShortcuts, commandLineShortcuts, gitShortcuts, windowsShortcuts } from './constants/shortcutLists';
import { Shortcut } from './types/types';

interface ShortcutDataProps {
    setShortcutList: (list: Shortcut[]) => void;
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
    const [selectedList, setSelectedList] = useState<string | null>(null);

    const shortcutLists = [
        { 
            id: 'VS_CODE', 
            name: "VS Code Shortcuts (Mac)", 
            list: vsCodeShortchutMac.map(item => ({ ...item, listId: 'VS_CODE' }))
        },
        { 
            id: 'MACOS', 
            name: "macOS Shortcuts", 
            list: macOsShortcut.map(item => ({ ...item, listId: 'MACOS' }))
        },
        { id: 'CURSOR', name: "Cursor Shortcuts", list: cursorShortcut.map(item => ({ ...item, listId: 'CURSOR' })) },
        { id: 'VIM', name: "Vim Shortcuts", list: vimShortcuts.map(item => ({ ...item, listId: 'VIM' })) },
        { id: 'EXCEL', name: "Excel Shortcuts", list: excelShortcuts.map(item => ({ ...item, listId: 'EXCEL' })) },
        { id: 'COMMAND_LINE', name: "Command Line Shortcuts", list: commandLineShortcuts.map(item => ({ ...item, listId: 'COMMAND_LINE' })) },
        { id: 'GIT', name: "Git Shortcuts", list: gitShortcuts.map(item => ({ ...item, listId: 'GIT' })) },
        { id: 'WINDOWS', name: "Windows Shortcuts", list: windowsShortcuts.map(item => ({ ...item, listId: 'WINDOWS' })) }
    ];

    const handleListSelect = (list: Shortcut[], id: string) => {
        setSelectedList(id);
        setShortcutList(shuffleArray(list));
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}><List/></button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Pick list">
                <div className="shortcut-list">
                    {shortcutLists.map((item) => (
                        <button 
                            key={item.id}
                            className={`shortcut-option ${selectedList === item.id ? 'selected' : ''}`}
                            onClick={() => handleListSelect(item.list, item.id)}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default ShortcutData;
