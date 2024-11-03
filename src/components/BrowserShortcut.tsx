//#region Imports
// React and Third-party Libraries
import React, { useEffect } from 'react';
//#endregion



// interface KeyboardEvent {
//   key: string;          // The actual key value ("a", "Enter", etc.)
//   code: string;         // Physical key code ("KeyA", "Enter", etc.)
//   altKey: boolean;      // Whether Alt/Option was pressed
//   ctrlKey: boolean;     // Whether Control was pressed
//   shiftKey: boolean;    // Whether Shift was pressed
//   metaKey: boolean;     // Whether Command (Mac) or Windows key was pressed
//   repeat: boolean;      // Whether key is being held down
// }
const BrowserShortcut = () => {
  useEffect(() => {
    // Function to prevent all keydown events
    const preventAllKeydown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    
    // Add event listener to the document
    document.addEventListener('keydown', preventAllKeydown);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('keydown', preventAllKeydown);
    };
  }, []);

  return null;
};

export default BrowserShortcut;