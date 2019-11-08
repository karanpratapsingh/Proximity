import React from 'react';
import { StyleSheet } from 'react-native';
import { MessageText } from 'react-native-gifted-chat';
import { Typography } from '../../../../theme';

const { FontWeights, FontSizes } = Typography;

const CustomMessageText = textProps => (
  <MessageText
    {...textProps}
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
    color: 'black'
  },
  right: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: 'white'
  }
});

export default CustomMessageText;