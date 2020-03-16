import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { Placeholder, PlaceholderLine } from 'rn-placeholder';
import { AppContext } from '@app/context';
import PlaceholderAnimation from './PlaceholderAnimation';

const ExploreScreenPlaceholder: React.FC = () => {
  const { theme } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Placeholder Animation={PlaceholderAnimation}>
        {new Array(8)
          .fill({})
          .map((_, index) =>
            <View key={index} style={styles.postContainer}>
              <PlaceholderLine color={theme.placeholder} style={styles.postPlaceholder} noMargin width={32} height={responsiveHeight(16.1)} />
              <PlaceholderLine color={theme.placeholder} style={styles.postPlaceholder} noMargin width={32} height={responsiveHeight(16.1)} />
              <PlaceholderLine color={theme.placeholder} style={styles.postPlaceholder} noMargin width={32} height={responsiveHeight(16.1)} />
            </View>
          )}
      </Placeholder>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 20
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 7
  },
  postPlaceholder: {
    borderRadius: 5
  }
});

export default ExploreScreenPlaceholder;