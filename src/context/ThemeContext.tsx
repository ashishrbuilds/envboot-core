import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'auto' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeContextType {
  themeMode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  theme: ResolvedTheme;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const getInitialThemeMode = (): ThemeMode => {
  if (typeof window === 'undefined') return 'auto';
  try {
    const saved = localStorage.getItem('envboot-theme');
    if (saved === 'light' || saved === 'dark' || saved === 'auto') {
      return saved;
    }
    return 'auto';
  } catch {
    return 'auto';
  }
};

const getSystemPreference = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'auto',
  resolvedTheme: 'dark',
  theme: 'dark',
  setThemeMode: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemPreference);

  // Monitor OS preference changes dynamically
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const resolvedTheme: ResolvedTheme =
    themeMode === 'auto' ? systemTheme : themeMode;

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }

    try {
      localStorage.setItem('envboot-theme', themeMode);
    } catch {
      // ignore
    }
  }, [themeMode, resolvedTheme]);

  const toggleTheme = () => {
    setThemeMode((prev) => {
      if (prev === 'auto') {
        return resolvedTheme === 'dark' ? 'light' : 'dark';
      }
      if (prev === 'light') {
        return 'dark';
      }
      return 'auto';
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        resolvedTheme,
        theme: resolvedTheme,
        setThemeMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
