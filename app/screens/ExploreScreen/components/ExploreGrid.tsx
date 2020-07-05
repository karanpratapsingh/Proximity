import React, { useContext } from 'react';
import { StyleSheet, View, RefreshControl } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { ListEmptyComponent, LoadingIndicator } from '@app/layout';
import { PrimaryImageGroup, SecondaryImageGroup } from './ExplorePostCard';
import { ExplorePost } from '@app/types/screens';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { parseGridImages } from '@app/utils/shared';
import { AppContext } from '@app/context';

interface ExploreGridProps {
  posts: ExplorePost[],
  onRefresh: () => void,
  tintColor: string,
  onEndReached: () => void
};

const ExploreGrid: React.FC<ExploreGridProps> = ({ posts, onRefresh, tintColor, onEndReached }) => {
  const { theme } = useContext(AppContext);

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

  const ListFooterComponent = () => (
    <View style={styles.listLoader}>
      <LoadingIndicator size={4} color={theme.text02} />
    </View>
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
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={ListFooterComponent}
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
  },
  listLoader: {
    marginBottom: 12
  }
});

export default ExploreGrid;