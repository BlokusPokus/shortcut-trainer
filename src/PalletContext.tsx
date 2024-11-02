import React, { createContext, useContext, useState, useEffect } from 'react'

interface PalletContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const PalletContext = createContext<PalletContextType | undefined>(undefined);

const PalletProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState("belgian-train");

    useEffect(() => {
      document.body.className = theme;
    }, [theme]);

    return (
      <PalletContext.Provider value={{theme, setTheme}}>
        {children}
      </PalletContext.Provider>
    )
}

export const usePalletContext = () => {
  const context = useContext(PalletContext);
  if (context === undefined) {
    throw new Error('usePalletContext must be used within a PalletProvider');
  }
  return context;
}

export default PalletProvider;
