import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_CREATE_USER } from '../../graphql/mutation';
import { AppContext } from '../../context';
import { useNavigation } from 'react-navigation-hooks';
import { Routes } from '../../constants';

const LoginScreen = () => {
  const [createUser] = useMutation(MUTATION_CREATE_USER);
  const { updateUser } = useContext(AppContext);
  const { navigate } = useNavigation();

  const onSignIn = async () => {
    const data = await GoogleSignin.signIn();
    const { idToken, user: { name, photo } } = data;
    console.log(data);
    //@ts-ignore
    const { data: { createUser: { id, avatar, handle } } } = await createUser({ variables: { token: idToken, avatar: photo, name } });
    updateUser({ id, avatar, handle });
    navigate(Routes.TabNavigator);
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