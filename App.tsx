import { ApolloProvider, useMutation } from '@apollo/react-hooks';
import { GoogleSignin } from '@react-native-community/google-signin';
import React, { useContext, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import codePush from 'react-native-code-push';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaView } from 'react-navigation';
import Config from './app/config';
import { Errors, PollIntervals } from './app/constants';
import { AppContext, AppContextProvider } from './app/context';
import client from './app/graphql/client';
import { MUTATION_LAST_SEEN } from './app/graphql/mutation';
import AppNavigator from './app/navigation';
import { ThemeStatic, Typography } from './app/theme';
import { DynamicStatusBar } from './app/theme/Colors';
import { ThemeColors } from './app/types/theme';
import { crashlytics } from './app/utils/firebase';
import { loadThemeType } from './app/utils/storage';
import { computeUnreadMessages } from './app/utils/shared';

const { webClientId } = Config;

GoogleSignin.configure({
  webClientId,
  forceConsentPrompt: true
});

const SafeAreaApp = () => {
  const { user, theme, themeType, toggleTheme, updateUnreadMessages } = useContext(AppContext);
  const { barStyle, backgroundColor } = DynamicStatusBar[themeType];
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
    setInterval(async () => {
      if (user.id) {
        try {
          const { data: { updateLastSeen: { chats } } } = await updateLastSeen({ variables: { userId: user.id } });
          const unreadMessages = computeUnreadMessages(chats, user.id);

          updateUnreadMessages(unreadMessages);
        } catch ({ message }) {
          crashlytics.recordCustomError(Errors.UPDATE_LAST_SEEN, message);
        }
      }
    }, PollIntervals.lastSeen);
  }, [user.id]);

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBar animated barStyle={barStyle} backgroundColor={backgroundColor} />
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

const CodepushApp = codePush({
  deploymentKey: Config.codepush.production,
  checkFrequency: codePush.CheckFrequency.ON_APP_START
})(App);

export default CodepushApp;
