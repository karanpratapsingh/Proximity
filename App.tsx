import { ApolloProvider, useMutation } from '@apollo/react-hooks';
import { GoogleSignin } from '@react-native-community/google-signin';
import React, { useContext, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { PollIntervals, Errors } from './app/constants';
import { AppContext, AppContextProvider } from './app/context';
import client from './app/graphql/client';
import AppNavigator from './app/navigation';
import { ThemeColors } from './app/types/theme';
import { loadThemeType } from './app/utils/storage';
import { MUTATION_LAST_SEEN } from './app/graphql/mutation';
import { ThemeVariant, Typography, ThemeStatic } from './app/theme';
import { crashlytics } from './app/utils/firebase';
import FlashMessage from 'react-native-flash-message';

GoogleSignin.configure();

const SafeAreaApp = () => {
  const { user, theme, themeType, toggleTheme } = useContext(AppContext);
  const dynamicBarStyle = `${themeType === ThemeVariant.light ? ThemeVariant.dark : ThemeVariant.light}-content`;
  const [updateLastSeen] = useMutation(MUTATION_LAST_SEEN);

  const initializeTheme = async () => {
    try {
      const themeType = await loadThemeType();
      toggleTheme(themeType);
    } catch ({ message }) {
      crashlytics.recordCustomError(Errors.LOAD_THEME, message);
    }
  };

  useEffect(() => {
    initializeTheme();
  }, []);

  useEffect(() => {
    setInterval(() => {
      if (user.id) {
        try {
          updateLastSeen({ variables: { userId: user.id } });
        } catch ({ message }) {
          crashlytics.recordCustomError(Errors.UPDATE_LAST_SEEN, message);
        }
      }
    }, PollIntervals.lastSeen);
  }, [user.id]);

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBar animated barStyle={dynamicBarStyle as any} />
      <AppNavigator />
      <FlashMessage titleStyle={styles().flashMessageTitle} floating position='bottom' />
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
  },
  flashMessageTitle: {
    ...Typography.FontWeights.Light,
    ...Typography.FontSizes.Body,
    color: ThemeStatic.white
  }
});

export default App;
