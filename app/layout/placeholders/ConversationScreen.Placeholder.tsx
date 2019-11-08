import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Fade, Placeholder, PlaceholderMedia, PlaceholderLine } from 'rn-placeholder';

const ConversationScreenPlaceholder = () => (
  <View style={styles.container}>
    {/* <Placeholder Animation={Fade}>
      <PlaceholderLine
        noMargin
        style={styles.placeholderLine}
        height={30}
        width={'50%' as any}
      />
    </Placeholder> */}
    <View style={styles.loaderContainer}>
      <ActivityIndicator />

    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholderLine: {
    borderRadius: 5
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ConversationScreenPlaceholder;