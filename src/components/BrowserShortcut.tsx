import React from 'react'
import { useEffect } from 'react';

const BrowserShortcut = () => {
useEffect(() => {
    const preventDefaultShortcuts = (e:KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) &&
    ['p','r','s','f','g'].includes(e.key.toLocaleLowerCase())){
        e.preventDefault();
    }
    };
    window.addEventListener('keydown',preventDefaultShortcuts);

  return () => {
    window.removeEventListener('keydown',preventDefaultShortcuts);
  };
}, []);

return null;
}

export default BrowserShortcut