import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const ConversationScreenPlaceholder = () => (
  <View style={styles.container}>
    <ActivityIndicator />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ConversationScreenPlaceholder;