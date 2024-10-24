import React, { useEffect } from 'react';

const BrowserShortcut: React.FC = () => {
  useEffect(() => {
    // Function to prevent all keydown events
    const preventAllKeydown = (e: KeyboardEvent) => {
      e.preventDefault();
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