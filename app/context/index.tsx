import React, { useState, createContext, } from 'react';
import { Theme } from '../theme';
import { ThemeColors } from '../types';
import { DummyUsers } from '../constants';

type AppContextType = {
  userId: string,
  updateUser: (id: string) => void
  theme: ThemeColors,
  toggleTheme: (type: string) => void
};

export const AppContext = createContext({} as AppContextType);

export const AppContextProvider = props => {
  const [userId, setUserId] = useState(DummyUsers['@occult_686']);
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
    <AppContext.Provider value={{ userId, updateUser, theme, toggleTheme }}>
      {props.children}
    </AppContext.Provider>
  );
};