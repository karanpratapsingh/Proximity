import { ApolloProvider } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { AppContext, AppContextProvider } from './app/context';
import client from './app/graphql/client';
import AppNavigator from './app/navigation';
import { ThemeColors } from './app/types';

const SafeAreaApp = () => {
  const { theme, themeType } = useContext(AppContext);
  const dynamicBarStyle = `${themeType === 'light' ? 'dark' : 'light'}-content`;
  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBar animated barStyle={dynamicBarStyle as any} />
      <AppNavigator />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <SafeAreaApp />
      </AppContextProvider>
    </ApolloProvider>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.base
  }
});

export default App;
