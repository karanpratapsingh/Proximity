import React from 'react';
import AppNavigator from './app/navigation';
import { ThemeContextProvider } from './app/context/ThemeContext';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  uri: 'https://social-app-node-graphql.herokuapp.com/',
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <ThemeContextProvider>
      <AppNavigator />
    </ThemeContextProvider>
  </ApolloProvider>
);

export default App;
