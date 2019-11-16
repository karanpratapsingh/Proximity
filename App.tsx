import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { YellowBox } from 'react-native';
import { AppContextProvider } from './app/context';
import client from './app/graphql/client';
import AppNavigator from './app/navigation';

YellowBox.ignoreWarnings(['Warning: Encountered two children with the same key']);

const App = () => (
  <ApolloProvider client={client}>
    <AppContextProvider>
      <AppNavigator />
    </AppContextProvider>
  </ApolloProvider>
);

export default App;
