import { ApolloProvider } from '@apollo/react-hooks';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { AppContext, AppContextProvider } from './app/context';
import client from './app/graphql/client';
import AppNavigator from './app/navigation';
import { ThemeColors } from './app/types';
import { ThemeType } from './app/constants';
import { GoogleSignin } from '@react-native-community/google-signin';
import { QUERY_SIGNIN } from './app/graphql/query';

GoogleSignin.configure();

const SafeAreaApp = () => {
  const { theme, themeType, updateUser } = useContext(AppContext);
  const dynamicBarStyle = `${themeType === ThemeType.light ? ThemeType.dark : ThemeType.light}-content`;
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('LoginScreen');

  const initialize = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      const currentUser = await GoogleSignin.getCurrentUser();
      //@ts-ignore
      const { data: { signIn: { id, avatar, handle } } } = await client.query({ query: QUERY_SIGNIN, variables: { token: currentUser.idToken } });
      updateUser({ id, avatar, handle });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

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
