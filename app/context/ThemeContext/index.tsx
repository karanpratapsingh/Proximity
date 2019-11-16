import React, { useState, createContext, } from 'react';
import { Theme } from '../../theme';
import { ThemeColors } from '../../types';

type ThemeContextType = {
  userId: string,
  updateUser: (id: string) => void
  theme: ThemeColors,
  toggleTheme: (type: string) => void
};

export const ThemeContext = createContext({} as ThemeContextType);

export const ThemeContextProvider = props => {
  const [userId, setUserId] = useState('ck2oj3x2n001w0765e34k94w1'); //@doggo
  const [theme, setTheme] = useState(Theme.light.colors);
  const [, setThemeType] = useState(Theme.light.type);

  const updateUser = id => {
    setUserId(id);
  };

  const toggleTheme = type => {
    setTheme(Theme[type].colors);
    setThemeType(type);
    //TODO: write to client cache or local storage for persistance
  };

  return (
    <ThemeContext.Provider value={{ userId, updateUser, theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};