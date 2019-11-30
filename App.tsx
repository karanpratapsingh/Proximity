import { ApolloProvider } from '@apollo/react-hooks';
import { GoogleSignin } from '@react-native-community/google-signin';
import React, { useContext } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { ThemeType } from './app/constants';
import { AppContext, AppContextProvider } from './app/context';
import client from './app/graphql/client';
import AppNavigator from './app/navigation';
import { ThemeColors } from './app/types';

GoogleSignin.configure();

const SafeAreaApp = () => {
  const { theme, themeType, updateUser } = useContext(AppContext);
  const dynamicBarStyle = `${themeType === ThemeType.light ? ThemeType.dark : ThemeType.light}-content`;

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
