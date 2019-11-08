import React from 'react';
import { StyleSheet } from 'react-native';
import { Composer } from 'react-native-gifted-chat';
import { Typography } from '../../../../theme';

const { FontWeights, FontSizes } = Typography;

const CustomComposer = inputProps => (
  <Composer
    {...inputProps}
    composerHeight={30}
    textInputProps={{ autoCorrect: false }}
    textInputStyle={styles.inputStyle}
  />
);

const styles = StyleSheet.create({
  inputStyle: {
    ...FontWeights.Light,
    ...FontSizes.Body
  }
});

export default CustomComposer;