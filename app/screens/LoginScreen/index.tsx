import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

GoogleSignin.configure();

const LoginScreen = props => {

  const onSignIn = async () => {
    const data = await GoogleSignin.signIn();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSignIn} style={{ padding: 20, backgroundColor: 'hotpink' }}>
        <Text>LoginScreen</Text>
      </TouchableOpacity>
      <GoogleSigninButton
        style={{ width: 192, height: 48, borderRadius: 40 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
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