'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type ColorTheme = 'default' | 'gold' | 'emerald' | 'cobalt' | 'ruby';

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colorTheme: ColorTheme;
  setColorTheme: (colorTheme: ColorTheme) => void;
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

const colorThemeConfig: Record<ColorTheme, { primary: string, primary_dark: string }> = {
    default: {
        primary: '330 60% 35%',
        primary_dark: '330 60% 55%'
    },
    gold: {
        primary: '35 92% 55%',
        primary_dark: '35 92% 65%'
    },
    emerald: {
        primary: '142 71% 45%',
        primary_dark: '142 71% 55%'
    },
    cobalt: {
        primary: '215 91% 65%',
        primary_dark: '215 91% 75%'
    },
    ruby: {
        primary: '350 82% 55%',
        primary_dark: '350 82% 65%'
    },
};

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  defaultColorTheme = 'default',
  storageKey = 'vite-ui-theme',
  colorStorageKey = 'vite-ui-color-theme',
}: {
  children: ReactNode;
  defaultTheme?: string;
  defaultColorTheme?: ColorTheme;
  storageKey?: string;
  colorStorageKey?: string;
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    try {
        const storedTheme = localStorage.getItem(storageKey) as Theme;
        if (storedTheme) return storedTheme;
        if (defaultTheme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
    } catch (e) {
        // localStorage is not available
    }
    return defaultTheme as Theme;
  });

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
     if (typeof window === 'undefined') return defaultColorTheme;
     try {
        return (localStorage.getItem(colorStorageKey) as ColorTheme) || defaultColorTheme
     } catch(e) {
        return defaultColorTheme;
     }
  });

  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (e) {
        // localStorage not available
    }
    setThemeState(newTheme);
  }

  const setColorTheme = (newColorTheme: ColorTheme) => {
      try {
        localStorage.setItem(colorStorageKey, newColorTheme);
      } catch (e) {
          // localStorage not available
      }
      setColorThemeState(newColorTheme);
  }

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const config = colorThemeConfig[colorTheme];
    
    if (config) {
        if (theme === 'light') {
            root.style.setProperty('--primary', config.primary);
            root.style.setProperty('--accent', config.primary);
            root.style.setProperty('--ring', config.primary);
        } else {
            root.style.setProperty('--primary', config.primary_dark);
            root.style.setProperty('--accent', config.primary_dark);
            root.style.setProperty('--ring', config.primary_dark);
        }
    }
  }, [colorTheme, theme]);

  const value = {
    theme,
    setTheme,
    colorTheme,
    setColorTheme,
  };

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
