
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  name: string;
}

export const availableThemes: Record<string, ThemeColors> = {
  orange: {
    primary: '#FF8500',
    primaryHover: '#E67600',
    name: 'Laranja'
  },
  blue: {
    primary: '#0037C1',
    primaryHover: '#002A91',
    name: 'Azul'
  },
  green: {
    primary: '#008C32',
    primaryHover: '#007129',
    name: 'Verde'
  },
  lightGreen: {
    primary: '#00DD4F',
    primaryHover: '#00C445',
    name: 'Verde Claro'
  },
  yellow: {
    primary: '#FDC300',
    primaryHover: '#E4B000',
    name: 'Amarelo'
  },
  lightBlue: {
    primary: '#00BDFF',
    primaryHover: '#00A8E6',
    name: 'Azul Claro'
  }
};

interface ThemeContextType {
  currentTheme: string;
  themeColors: ThemeColors;
  setTheme: (theme: string) => void;
  isLightColor: (color: string) => boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<string>('blue');

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme && availableThemes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const setTheme = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem('app-theme', theme);
  };

  const isLightColor = (color: string) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 155;
  };

  const themeColors = availableThemes[currentTheme];

  return (
    <ThemeContext.Provider value={{ currentTheme, themeColors, setTheme, isLightColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
