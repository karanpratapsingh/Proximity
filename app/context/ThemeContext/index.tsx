import React, { useState, createContext, } from 'react';
import { Theme } from '../../theme';
import { ThemeColors } from '../../types';

type ThemeContextType = {
  theme: ThemeColors,
  toggleTheme: (type: string) => void
};

export const ThemeContext = createContext({} as ThemeContextType);

export const ThemeContextProvider = props => {
  const [theme, setTheme] = useState(Theme.light.colors);
  const [themeType, setThemeType] = useState(Theme.light.type);

  const toggleTheme = type => {
    setTheme(Theme[type].colors);
    setThemeType(type);
    //TODO: write to client cache or local storage for persistance
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};