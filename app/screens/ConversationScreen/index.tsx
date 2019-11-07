import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks';

const ConversationScreen = () => {
  const chatId = useNavigationParam('chatId');
  return (
    <View style={styles.container}>
      <Text>{chatId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ConversationScreen;