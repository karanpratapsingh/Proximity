import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';
import { generateUUID } from '../../utils';

const ExploreScreenPlaceholder: React.FC = () => (
  <View style={styles.container}>
    <Placeholder Animation={Fade}>
      {new Array(8)
        .fill(generateUUID())
        .map(placeholderKey =>
          <View key={placeholderKey} style={styles.postContainer}>
            <PlaceholderLine style={styles.postPlaceholder} noMargin width={32.5} height={100} />
            <PlaceholderLine style={styles.postPlaceholder} noMargin width={32.5} height={100} />
            <PlaceholderLine style={styles.postPlaceholder} noMargin width={32.5} height={100} />
          </View>
        )}
    </Placeholder>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 0
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  postPlaceholder: {
    borderRadius: 5
  }
});

export default ExploreScreenPlaceholder;