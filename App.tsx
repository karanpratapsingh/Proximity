import React from 'react';
import AppNavigator from './app/navigation';
import { ThemeContextProvider } from './app/context/ThemeContext';

const App = () => (
  <ThemeContextProvider>
    <AppNavigator />
  </ThemeContextProvider>
);

export default App;
