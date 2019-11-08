import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { YellowBox } from 'react-native';
import { ThemeContextProvider } from './app/context/ThemeContext';
import client from './app/graphql/client';
import AppNavigator from './app/navigation';

YellowBox.ignoreWarnings(['Warning: Encountered two children with the same key']);

const App = () => (
  <ApolloProvider client={client}>
    <ThemeContextProvider>
      <AppNavigator />
    </ThemeContextProvider>
  </ApolloProvider>
);

export default App;
