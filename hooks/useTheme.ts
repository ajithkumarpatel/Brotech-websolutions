

import React, { useState, useEffect, createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Fix: Explicitly type ThemeProvider as a React.FC to ensure proper type inference when used in .tsx files.
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('theme');
      if (typeof storedPrefs === 'string') {
        return storedPrefs as Theme;
      }
      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (userMedia.matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fix: Use React.createElement to avoid JSX syntax in a .ts file.
  return React.createElement(ThemeContext.Provider, { value: { theme, setTheme } }, children);
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
