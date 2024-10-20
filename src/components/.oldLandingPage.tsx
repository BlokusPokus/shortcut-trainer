import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import Hotkeytest from './hotkeytest';
const LandingPage = () => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

    // Define different shortcuts for Mac and PC
    const shortcutList = isMac
        ? [
            { shortcut: 'meta+c', action: 'Copy' },
            { shortcut: 'meta+v', action: 'Paste' },
            { shortcut: 'alt+s', action: 'Save' }
          ]
        : [
            { shortcut: 'control+c', action: 'Copy' },
            { shortcut: 'control+v', action: 'Paste' },
            { shortcut: 'alt+s', action: 'Save' }
          ];

    const [inputHistory, setInputHistory] = useState<string[]>([]);
    const [pressedKeys, setPressedKeys] = useState(new Set<string>());

    const handleKeyDown = (event: KeyboardEvent) => {
        // Prevent default actions for certain combinations like control+c
        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
        }
        
        const key = event.key.toLowerCase();

        // Add the key to the set of pressed keys, but prevent duplicates
        setPressedKeys(prevKeys => new Set(prevKeys).add(key));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        const key = event.key.toLowerCase();

        setPressedKeys(prevKeys => {
            const updatedKeys = new Set(prevKeys);
            updatedKeys.delete(key); // Remove the released key
            return updatedKeys;
        });

        validateInput();
    };

    const validateInput = () => {
        // Join pressed keys with '+' to match the shortcut format, and sort them for consistency
        const combination = Array.from(pressedKeys).sort().join('+');

        // Find if the current combination matches any shortcut
        const foundShortcut = shortcutList.find(item => item.shortcut === combination);

        if (foundShortcut) {
            setInputHistory(prev => [...prev, `${combination} - ${foundShortcut.action} (valid)`]);
        } else {
            setInputHistory(prev => [...prev, `${combination} (invalid)`]);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [pressedKeys]);

    return (
        <div className='container'>
            <div className="top-section">
                <div>Press combinations like 'Ctrl+C' (PC) or 'Cmd+C' (Mac)</div>
            </div>
            <div className="middle-section">
                <button onClick={() => setInputHistory([])}>Clear History</button>
            </div>
            <div className="bottom-section">HISTORY OF INPUTS</div>
            <div>
                {inputHistory.map((input, index) => (
                    <div key={index}>{input}</div>
                ))}
            </div>
        </div>
    );
}

export default LandingPage;
