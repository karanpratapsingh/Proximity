import React, { useState, createContext, } from 'react';
import { Theme } from '../theme';
import { ThemeColors } from '../types';
import { DummyUsers } from '../constants';

type UserType = {
  id: string,
  avatar: string,
  handle: string
};

type AppContextType = {
  user: UserType,
  updateUser: (use: UserType) => void
  theme: ThemeColors,
  themeType: string,
  toggleTheme: (type: string) => void
};

export const AppContext = createContext({} as AppContextType);

export const AppContextProvider = props => {
  const [user, setUser] = useState({
    id: DummyUsers['@occult_686'],
    avatar: 'https://images.unsplash.com/reserve/eBJIgrh3TCeHf7unLQ5e_sailing-5.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80',
    handle: '@occult_686'
  });
  const [theme, setTheme] = useState(Theme.light.colors);
  const [themeType, setThemeType] = useState(Theme.light.type);

  const updateUser = (user: UserType) => {
    setUser(user);
  };

  const toggleTheme = type => {
    setTheme(Theme[type].colors);
    setThemeType(type);
    //TODO: write to client cache or local storage for persistance
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