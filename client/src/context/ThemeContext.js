import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();
const THEME_STORAGE_KEY = 'appTheme.v2';
const LEGACY_THEME_STORAGE_KEY = 'appTheme';

const colorValues = {
  blue: { r: '59', g: '130', b: '246' },
  red: { r: '239', g: '68', b: '68' },
  green: { r: '34', g: '197', b: '94' },
  purple: { r: '147', g: '51', b: '234' },
  pink: { r: '236', g: '72', b: '153' },
  indigo: { r: '79', g: '70', b: '229' },
  yellow: { r: '234', g: '179', b: '8' },
  orange: { r: '249', g: '115', b: '22' },
  cyan: { r: '34', g: '211', b: '238' },
  teal: { r: '20', g: '184', b: '166' }
};

const fontFamilyValues = {
  sans: "'system-ui', '-apple-system', 'sans-serif'",
  serif: "'Georgia', 'serif'",
  mono: "'Courier New', 'monospace'"
};

const fontSizeValues = {
  sm: '14px',
  base: '16px',
  lg: '18px'
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    primaryColor: 'pink',
    secondaryColor: 'cyan',
    accentColor: 'purple',
    fontFamily: 'sans',
    fontSize: 'base',
    darkMode: true
  });

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      const parsedTheme = JSON.parse(savedTheme);
      setTheme(parsedTheme);
      applyThemeStyles(parsedTheme);
    } else {
      const legacyTheme = localStorage.getItem(LEGACY_THEME_STORAGE_KEY);
      const initialTheme = legacyTheme
        ? { ...theme, ...JSON.parse(legacyTheme), darkMode: true }
        : theme;
      setTheme(initialTheme);
      applyThemeStyles(initialTheme);
    }
  }, []);

  // Apply theme styles to document root
  const applyThemeStyles = (currentTheme) => {
    const root = document.documentElement;
    const primaryRGB = colorValues[currentTheme.primaryColor];
    const secondaryRGB = colorValues[currentTheme.secondaryColor];
    const accentRGB = colorValues[currentTheme.accentColor];

    root.style.setProperty('--color-primary', `${primaryRGB.r}, ${primaryRGB.g}, ${primaryRGB.b}`);
    root.style.setProperty('--color-secondary', `${secondaryRGB.r}, ${secondaryRGB.g}, ${secondaryRGB.b}`);
    root.style.setProperty('--color-accent', `${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}`);
    root.style.setProperty('--font-family', fontFamilyValues[currentTheme.fontFamily]);
    root.style.setProperty('--font-size', fontSizeValues[currentTheme.fontSize]);
    
    // Apply dark mode
    if (currentTheme.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    applyThemeStyles(theme);
  }, [theme]);

  const updateTheme = (newTheme) => {
    setTheme(prev => ({ ...prev, ...newTheme }));
  };

  const resetTheme = () => {
    const defaultTheme = {
      primaryColor: 'pink',
      secondaryColor: 'cyan',
      accentColor: 'purple',
      fontFamily: 'sans',
      fontSize: 'base',
      darkMode: true
    };
    setTheme(defaultTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
