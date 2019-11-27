import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';

const ExploreScreenPlaceholder: React.FC = () => (
  <View style={styles.container}>
    <Placeholder Animation={props => <Fade {...props} />}>
      {new Array(8)
        .fill({})
        .map((_, index) =>
          <View key={index} style={styles.postContainer}>
            <PlaceholderLine style={styles.postPlaceholder} noMargin width={32.5} height={100} />
            <PlaceholderLine style={styles.postPlaceholder} noMargin width={32.5} height={100} />
            <PlaceholderLine style={styles.postPlaceholder} noMargin width={32.5} height={100} />
          </View>
        )}
    </Placeholder>
  </View >
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  postPlaceholder: {
    borderRadius: 10
  }
});

export default ExploreScreenPlaceholder;