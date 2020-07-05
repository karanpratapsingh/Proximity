import React, { Fragment, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Placeholder, PlaceholderLine } from 'rn-placeholder';
import { AppContext } from '@app/context';
import PlaceholderAnimation from './PlaceholderAnimation';

const ExploreScreenPlaceholder: React.FC = () => (
  <View style={styles.container}>
    <Placeholder Animation={PlaceholderAnimation}>
      {new Array(2).fill({}).map((_, index) => (
        <Fragment key={index}>
          {new Array(2).fill({}).map((__, index) => (
            <PrimaryImageGroupPlaceholder key={index} />
          ))}
          <SecondaryImageGroupPlaceholder />
        </Fragment>
      ))}
    </Placeholder>
  </View>
);


const PrimaryImageGroupPlaceholder = (): React.ReactElement => {
  const { theme } = useContext(AppContext);
  return (
    <View style={styles.postContainer}>
      <PlaceholderLine color={theme.placeholder} style={styles.postPlaceholder} noMargin width={32} height={responsiveWidth(29)} />
      <PlaceholderLine color={theme.placeholder} style={styles.postPlaceholder} noMargin width={32} height={responsiveWidth(29)} />
      <PlaceholderLine color={theme.placeholder} style={styles.postPlaceholder} noMargin width={32} height={responsiveWidth(29)} />
    </View>
  );
}

const SecondaryImageGroupPlaceholder = (): React.ReactElement => {
  const { theme } = useContext(AppContext);
  const secondaryTileOffset: number = 5;
  return (
    <View style={styles.secondaryImageGroup}>
      <View style={styles.secondaryLeftColumn}>
        <PlaceholderLine color={theme.placeholder} style={styles.postPlaceholder} noMargin width={96} height={responsiveWidth(29)} />
        <PlaceholderLine color={theme.placeholder} style={[styles.postPlaceholder, { marginTop: secondaryTileOffset }]} noMargin width={96} height={responsiveWidth(29)} />
      </View>
      <PlaceholderLine color={theme.placeholder} style={styles.postPlaceholder} noMargin width={65} height={responsiveWidth(58) + secondaryTileOffset} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 20
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  postPlaceholder: {
    marginRight: 5,
    borderRadius: 4
  },
  secondaryImageGroup: {
    flexDirection: 'row',
    marginBottom: 5
  },
  secondaryLeftColumn: {
    flex: 1,
  }
});

export default ExploreScreenPlaceholder;