import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const handleKeyDown = (event: { preventDefault?: any; ctrlKey?: any; metaKey?: any; shiftKey?: any; key?: any; }) => {
      const { ctrlKey, metaKey, shiftKey, key } = event;

      // List of shortcut combinations to prevent
      const preventShortcuts = [
        (ctrlKey || metaKey) && key.toLowerCase() === 'c', // Copy
        (ctrlKey || metaKey) && key.toLowerCase() === 'x', // Cut
        (ctrlKey || metaKey) && key.toLowerCase() === 'v', // Paste
        (ctrlKey || metaKey) && key.toLowerCase() === 's', // Save
        (ctrlKey || metaKey) && key.toLowerCase() === 'p', // Print
        (ctrlKey || metaKey) && key.toLowerCase() === 'z', // Undo
        (ctrlKey || metaKey) && shiftKey && key.toLowerCase() === 'z', // Redo (Cmd+Shift+Z)
        (ctrlKey || metaKey) && key.toLowerCase() === 'y', // Redo (Ctrl+Y)
        (ctrlKey || metaKey) && key.toLowerCase() === 'f', // Find
        (ctrlKey || metaKey) && key.toLowerCase() === 'a', // Select All
        (ctrlKey || metaKey) && key.toLowerCase() === 'r', // Reload
        key === 'F5', // Reload with F5
        metaKey && shiftKey && key.toLowerCase() === 'n', // Shift + Meta + N for new private/incognito window
      ];

      // If any shortcut condition is true, prevent the default action
      if (preventShortcuts.some(Boolean)) {
        event.preventDefault();
        console.log(`Shortcut ${key.toUpperCase()} disabled`);
      }
    };

    // Attach event listener at the document level for broader coverage
    document.addEventListener('keydown', handleKeyDown);

    // Clean up on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <h1>All Common Shortcuts Disabled in React</h1>
    </div>
  );
}

export default App;
