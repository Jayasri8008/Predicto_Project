import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [resolvedMode, setResolvedMode] = useState('light');

  const colors = {
    primary: resolvedMode === 'dark' ? '#3b82f6' : '#2563eb',
    secondary: resolvedMode === 'dark' ? '#8b5cf6' : '#7c3aed',
  };

  useEffect(() => {
    // You can add logic here to detect system theme or load from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setResolvedMode(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = resolvedMode === 'light' ? 'dark' : 'light';
    setResolvedMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  return (
    <ThemeContext.Provider value={{ colors, resolvedMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
