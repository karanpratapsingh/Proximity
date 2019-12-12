import React from 'react';
import { StyleSheet, View, RefreshControl, ActivityIndicator } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { ListEmptyComponent } from '../../../layout';
import ExplorePostCard from './ExplorePostCard';
import { ExplorePost } from '../../../types/screens';

interface ExploreGridProps {
  posts: ExplorePost[],
  onRefresh: any
};

const ExploreGrid: React.FC<ExploreGridProps> = ({ posts, onRefresh }) => {

  const renderItem = ({ item }) => {
    const { id: postId, uri } = item;

    return <ExplorePostCard
      postId={postId}
      uri={uri}
    />;
  };

  const refreshControl = () => (
    <RefreshControl
      refreshing={false}
      onRefresh={onRefresh} />
  );

  return (
    <View style={styles.container}>
      <FlatGrid
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
    paddingHorizontal: 16
  }
});

export default ExploreGrid;