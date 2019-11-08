import React from 'react';
import { StyleSheet } from 'react-native';
import { MessageText } from 'react-native-gifted-chat';
import { Typography } from '../../../../theme';
import { ThemeStatic } from '../../../../theme/Colors';

const { FontWeights, FontSizes } = Typography;

const CustomMessageText = messageTextProps => (
  <MessageText
    {...messageTextProps}
    textStyle={{
      left: styles.left,
      right: styles.right
    }}
  />
);

const styles = StyleSheet.create({
  left: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: ThemeStatic.black
  },
  right: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: ThemeStatic.white
  }
});

export default CustomMessageText;