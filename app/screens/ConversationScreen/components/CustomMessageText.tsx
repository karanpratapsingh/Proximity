import React from 'react';
import { StyleSheet } from 'react-native';
import { MessageText } from 'react-native-gifted-chat';
import { Typography, ThemeStatic } from '@app/theme';

const { FontWeights, FontSizes } = Typography;

const CustomMessageText: React.FC = messageTextProps => (
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