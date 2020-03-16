import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconSizes } from '@app/constants';
import { ThemeStatic } from '@app/theme';
import LoadingIndicator from '../misc/LoadingIndicator';

const ConversationScreenPlaceholder = () => (
  <View style={styles.container}>
    <LoadingIndicator size={IconSizes.x2} color={ThemeStatic.accent} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ConversationScreenPlaceholder;