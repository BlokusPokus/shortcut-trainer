import { useState, useEffect } from 'react';

export const useOsDetection = () => {
  const [isMac, setIsMac] = useState(() => {
    const stored = localStorage.getItem('isMac');
    return stored
      ? JSON.parse(stored)
      : navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  });

  useEffect(() => {
    localStorage.setItem('isMac', JSON.stringify(isMac));
  }, [isMac]);

  return { isMac, setIsMac };
};
