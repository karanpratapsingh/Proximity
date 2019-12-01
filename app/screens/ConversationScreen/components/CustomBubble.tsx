import React from 'react';
import { StyleSheet } from 'react-native';
import { Bubble } from 'react-native-gifted-chat';
import { ThemeStatic } from '../../../theme';

const CustomBubble = bubbleProps => (
  <Bubble
    {...bubbleProps}
    // @ts-ignore 
    wrapperStyle={{ right: styles.right }}
  />
);

const styles = StyleSheet.create({
  right: {
    backgroundColor: ThemeStatic.accent
  }
});

export default CustomBubble;