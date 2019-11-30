import { useMutation } from '@apollo/react-hooks';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { Routes } from '../../constants';
import { AppContext } from '../../context';
import client from '../../graphql/client';
import { MUTATION_CREATE_USER } from '../../graphql/mutation';
import { QUERY_SIGNIN, QUERY_USER_EXISTS } from '../../graphql/query';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeColors } from '../../types';
import { Typography } from '../../theme';

const { FontWeights, FontSizes } = Typography;

const LoginScreen: React.FC = () => {
  const [createUser] = useMutation(MUTATION_CREATE_USER);
  const { theme, updateUser } = useContext(AppContext);
  const { navigate } = useNavigation();

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
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      const currentUser = await GoogleSignin.getCurrentUser();
      //@ts-ignore
      navigateToApp(currentUser.user.id);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const onSignIn = async () => {
    const data = await GoogleSignin.signIn();
    const { user: { id: token, name, photo } } = data;

    const { data: { userExists } } = await client.query({ query: QUERY_USER_EXISTS, variables: { token } });
    if (!userExists) {
      await createUser({ variables: { token: token, avatar: photo, name } });
    }
    //@ts-ignore
    navigateToApp(token);
  };

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).banner}>
        <Text style={styles(theme).titleText}>Proximity</Text>
        <Text style={styles(theme).subtitleText}>
          Welcome to a social media where you are more than a statistics
        </Text>
      </View>

      <TouchableOpacity
        onPress={onSignIn}
        style={styles(theme).loginButton}>
        <Text style={styles(theme).loginButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.base
  },
  banner: {
    marginTop: 80,
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
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: theme.accent
  },
  loginButtonText: {
    ...FontWeights.Light,
    ...FontSizes.Label,
    color: theme.white
  }
});

export default LoginScreen;