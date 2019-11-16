import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../../theme';
import { ThemeStatic } from '../../theme/Colors';
import LoadingIndicator from '../misc/LoadingIndicator';

const { IconSizes } = Typography;
const ConversationScreenPlaceholder = () => (
  <View style={styles.container}>
    <LoadingIndicator size={IconSizes.x2} color={ThemeStatic.accent} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ConversationScreenPlaceholder;