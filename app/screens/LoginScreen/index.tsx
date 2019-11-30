import { useMutation } from '@apollo/react-hooks';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { Routes } from '../../constants';
import { AppContext } from '../../context';
import client from '../../graphql/client';
import { MUTATION_CREATE_USER } from '../../graphql/mutation';
import { QUERY_SIGNIN, QUERY_USER_EXISTS } from '../../graphql/query';

const LoginScreen = () => {
  const [createUser] = useMutation(MUTATION_CREATE_USER);
  const { updateUser } = useContext(AppContext);
  const { navigate } = useNavigation();

  const navigateToApp = async (token: string) => {
    const { data: { signIn: { id, avatar, handle } } } = await client
      .query({
        query: QUERY_SIGNIN,
        variables: { token }
      });
    updateUser({ id, avatar, handle });
    console.log('navigate to App');

    navigate('App');
  };
  // GoogleSignin.signOut()
  const initialize = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    console.log('signed in', isSignedIn);
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
    console.log('user exists?', userExists);
    console.log(token)
    if (!userExists) {
      // const { data: { createUser: { id, avatar, handle } } } =
      console.log('creating user');
      await createUser({ variables: { token: token, avatar: photo, name } });
    }
    //@ts-ignore
    navigateToApp(token);
  };

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onSignIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default LoginScreen;