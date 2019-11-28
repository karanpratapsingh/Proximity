import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Placeholder, PlaceholderLine } from 'rn-placeholder';
import PlaceholderAnimation from './PlaceholderAnimation';
import { AppContext } from '../../context';

const ExploreScreenPlaceholder: React.FC = () => {
  const { theme } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Placeholder Animation={PlaceholderAnimation}>
        {new Array(8)
          .fill({})
          .map((_, index) =>
            <View key={index} style={styles.postContainer}>
              <PlaceholderLine color={theme.placeholder} style={styles.postPlaceholder} noMargin width={32.5} height={100} />
              <PlaceholderLine color={theme.placeholder} style={styles.postPlaceholder} noMargin width={32.5} height={100} />
              <PlaceholderLine color={theme.placeholder} style={styles.postPlaceholder} noMargin width={32.5} height={100} />
            </View>
          )}
      </Placeholder>
    </View >
  );
};

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