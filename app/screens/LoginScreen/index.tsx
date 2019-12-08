import { useMutation } from '@apollo/react-hooks';
import { GoogleSignin } from '@react-native-community/google-signin';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import SplashScreen from 'react-native-splash-screen';
import { useNavigation } from 'react-navigation-hooks';
import GoogleLogo from '../../../assets/svg/google-logo.svg';
import LoginBanner from '../../../assets/svg/login-banner.svg';
import { Routes, IconSizes } from '../../constants';
import { AppContext } from '../../context';
import client from '../../graphql/client';
import { MUTATION_CREATE_USER } from '../../graphql/mutation';
import { QUERY_SIGNIN, QUERY_USER_EXISTS } from '../../graphql/query';
import { Button, LoadingIndicator } from '../../layout';
import { ThemeStatic, Typography } from '../../theme';
import { ThemeColors } from '../../types/theme';
import { handleLoginError } from '../../utils/authentication';
import { loadToken, saveToken } from '../../utils/storage';
import TermsAndConditionsBottomSheet from './components/TermsAndConditionsBottomSheet'

const { FontWeights, FontSizes } = Typography;

const LoginScreen: React.FC = () => {
  const { theme, updateUser } = useContext(AppContext);
  const { navigate } = useNavigation();
  const [createUser] = useMutation(MUTATION_CREATE_USER);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);

  const termsAndConditionsBottomSheetRef = useRef();

  const navigateToApp = async (token: string) => {
    const { data: { signIn: { id, avatar, handle } } } = await client
      .query({
        query: QUERY_SIGNIN,
        variables: { token }
      });
    updateUser({ id, avatar, handle });
    navigate(Routes.App);
  };

  const initialize = async () => {
    try {
      const token = await loadToken();
      navigateToApp(token);
    } catch ({ message, name: errorType }) {
      handleLoginError(errorType);
      setInitializing(false);
    }
    SplashScreen.hide();
  };

  useEffect(() => {
    initialize();
  }, []);

  const onGoogleSignIn = async () => {

    if (loading) return;

    try {
      setLoading(true);
      const data = await GoogleSignin.signIn();
      const { user: { id: token, name, photo, email } } = data;

      const { data: { userExists } } = await client.query({ query: QUERY_USER_EXISTS, variables: { token } });
      if (!userExists) {
        await createUser({ variables: { token: token, avatar: photo, name, email } });
      }
      await saveToken(token);
      setLoading(false);
      navigateToApp(token);
    } catch ({ message }) {
      setLoading(false);
      alert(JSON.stringify({ message }));
    }
  };

  let content = <LoadingIndicator color={ThemeStatic.accent} size={IconSizes.x1} />;

  if (!initializing) {
    content = (
      <>
        <View style={styles(theme).content}>
          <Text style={styles(theme).titleText}>Proximity</Text>
          <Text style={styles(theme).subtitleText}>
            Welcome to a open
            source social media where you are
            more than a statistics
        </Text>
        </View>
        <View style={styles(theme).banner}>
          <LoginBanner />
          <View>
            <Button
              Icon={GoogleLogo}
              label='Sign in with Google'
              onPress={onGoogleSignIn}
              containerStyle={styles(theme).loginButton}
              labelStyle={styles(theme).loginButtonText}
              indicatorColor={ThemeStatic.accent}
              loading={loading}
            />
            <TouchableOpacity
              // @ts-ignore
              onPress={termsAndConditionsBottomSheetRef.current.open}
              style={styles(theme).terms}>
              <Text style={styles(theme).termsText}>Terms and conditions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
  return (
    <View style={styles(theme).container}>
      {content}
      <TermsAndConditionsBottomSheet ref={termsAndConditionsBottomSheetRef} />
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.base
  },
  content: {
    marginTop: 40,
    marginHorizontal: 20
  },
  titleText: {
    ...FontWeights.Bold,
    ...FontSizes.Heading,
    color: theme.text01
  },
  subtitleText: {
    ...FontWeights.Light,
    ...FontSizes.Label,
    marginTop: 10,
    color: theme.text02
  },
  banner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: responsiveHeight(12),
    paddingBottom: 16,
  },
  loginButton: {
    height: 44,
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginBottom: 10,
    borderWidth: Platform.select({ ios: StyleSheet.hairlineWidth, android: 0.8 }),
    borderColor: theme.accent,
    backgroundColor: theme.base
  },
  loginButtonText: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    marginLeft: 10,
    color: theme.accent
  },
  terms: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  termsText: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: theme.text02
  }
});

export default LoginScreen;