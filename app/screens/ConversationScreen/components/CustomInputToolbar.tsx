import React from 'react';
import { StyleSheet } from 'react-native';
import { InputToolbar } from 'react-native-gifted-chat';
import { ThemeStatic } from '@app/theme';

const CustomInputToolbar: React.FC = inputToolbarProps => (
  <InputToolbar
    {...inputToolbarProps}
    containerStyle={styles.container}
    primaryStyle={styles.primary}
  />
);

const styles = StyleSheet.create({
  container: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0,
    marginBottom: 10,
    backgroundColor: 'transparent'
  },
  primary: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeStatic.text02
  }
});

export default CustomInputToolbar;