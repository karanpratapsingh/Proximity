import React from 'react';
import { InputToolbar } from 'react-native-gifted-chat';
import { StyleSheet } from 'react-native';
import { ThemeStatic } from '../../../theme';

const CustomInputToolbar = inputToolbarProps => (
  <InputToolbar
    {...inputToolbarProps}
    containerStyle={styles.container}
    primaryStyle={styles.primary}
  />
);

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0
  },
  primary: {
    minHeight: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeStatic.text02
  }
})

export default CustomInputToolbar;