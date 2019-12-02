import React, { useState, createContext, } from 'react';
import { Theme } from '../theme';
import { ThemeColors } from '../types';
import { saveThemeType } from '../utils/storage';

type UserType = {
  id: string,
  avatar: string,
  handle: string
};

type AppContextType = {
  user: UserType,
  updateUser: (user: UserType) => void
  theme: ThemeColors,
  themeType: string,
  toggleTheme: (type: string) => void
};

export const AppContext = createContext({} as AppContextType);

export const AppContextProvider = props => {
  const [user, setUser] = useState({
    id: '',
    avatar: '',
    handle: ''
  });
  const [theme, setTheme] = useState(Theme.light.colors);
  const [themeType, setThemeType] = useState(Theme.light.type);

  const updateUser = (user: UserType) => {
    setUser(user);
  };

  const toggleTheme = (type: string) => {
    setTheme(Theme[type].colors);
    setThemeType(type);
    saveThemeType(type);
  };

  const value = {
    user,
    updateUser,
    theme,
    themeType,
    toggleTheme
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};