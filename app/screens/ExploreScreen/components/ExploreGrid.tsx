import React from 'react';
import { StyleSheet, View, RefreshControl } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { ListEmptyComponent } from '@app/layout';
import { PrimaryImageGroup, SecondaryImageGroup } from './ExplorePostCard';
import { ExplorePost } from '@app/types/screens';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { parseGridImages } from '@app/utils/shared';

interface ExploreGridProps {
  posts: ExplorePost[],
  onRefresh: () => void,
  tintColor: string
};

const ExploreGrid: React.FC<ExploreGridProps> = ({ posts, onRefresh, tintColor }) => {

  const renderItem = ({ item, index }) => {
    const isSecondaryImageGroup = index % 3 === 2;

    if (isSecondaryImageGroup) {
      const reversed = index % 2 === 1;

      return <SecondaryImageGroup reversed={reversed} imageGroup={item} />;
    }

    return <PrimaryImageGroup imageGroup={item} />
  };

  const refreshControl = () => (
    <RefreshControl
      tintColor={tintColor}
      refreshing={false}
      onRefresh={onRefresh} />
  );

  const parsedGridImages = parseGridImages(posts);

  return (
    <View style={styles.container}>
      <FlatGrid
        staticDimension={responsiveWidth(92)}
        refreshControl={refreshControl()}
        itemDimension={responsiveWidth(92)}
        showsVerticalScrollIndicator={false}
        items={parsedGridImages}
        ListEmptyComponent={() => <ListEmptyComponent placeholder='No posts found' spacing={60} />}
        spacing={5}
        renderItem={renderItem}
      />
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

export default ExploreGrid;