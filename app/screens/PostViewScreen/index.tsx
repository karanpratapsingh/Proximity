import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostViewScreen = props => (
  <View style={styles.container}>
    <Text>PostViewScreen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default PostViewScreen;