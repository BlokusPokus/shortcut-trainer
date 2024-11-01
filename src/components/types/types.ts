export interface Theme {
    id: string;
    name: string;
    description?: string;
    className?: string;
  }
  
  export interface CommandPaletteProps {
    themes?: Theme[];
    onThemeChange?: (themeId: string) => void;
    currentTheme?: string;
  }