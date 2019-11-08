import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Send } from 'react-native-gifted-chat';
import { Typography } from '../../../../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ThemeStatic } from '../../../../theme/Colors';

const { IconSizes } = Typography;

const CustomSend = sendProps => (
  <Send
    {...sendProps}
    containerStyle={styles.container}>
    <FontAwesome name='send' size={IconSizes.x5} color={ThemeStatic.accent} />
  </Send>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  }
});

export default CustomSend;