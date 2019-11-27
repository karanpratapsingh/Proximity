import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';

const PostCardPlaceholder = () => (
  <View style={styles.container}>
    <Placeholder Animation={props => <Fade {...props} />}>
      {new Array(4)
        .fill({})
        .map((_, index) =>
          <PlaceholderLine
            noMargin
            key={index}
            height={400}
            style={styles.card}
          />
        )}
    </Placeholder>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 2,
    paddingHorizontal: 20
  },
  card: {
    marginTop: 20,
    borderRadius: 10
  }
});

export default PostCardPlaceholder;