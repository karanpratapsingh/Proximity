import React from 'react';
import { StyleSheet, View, RefreshControl } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { ListEmptyComponent } from '../../../layout';
import ExplorePostCard from './ExplorePostCard';
import { ExplorePost } from '../../../types/screens';
import { responsiveWidth } from 'react-native-responsive-dimensions';

interface ExploreGridProps {
  posts: ExplorePost[],
  onRefresh: () => void,
  tintColor: string
};

const ExploreGrid: React.FC<ExploreGridProps> = ({ posts, onRefresh, tintColor }) => {

  const renderItem = ({ item }) => {
    const { id: postId, uri } = item;

    return <ExplorePostCard
      postId={postId}
      uri={uri}
    />;
  };

  const refreshControl = () => (
    <RefreshControl
      tintColor={tintColor}
      refreshing={false}
      onRefresh={onRefresh} />
  );

  return (
    <View style={styles.container}>
      <FlatGrid
        staticDimension={responsiveWidth(92)}
        refreshControl={refreshControl()}
        itemDimension={100}
        showsVerticalScrollIndicator={false}
        items={posts}
        ListEmptyComponent={() => <ListEmptyComponent placeholder='No posts found' spacing={60} />}
        spacing={6}
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