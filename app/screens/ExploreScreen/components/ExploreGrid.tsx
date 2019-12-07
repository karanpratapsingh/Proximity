import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { ListEmptyComponent } from '../../../layout';
import ExplorePostCard from './ExplorePostCard';

type Post = {
  id: string,
  uri: string
};

interface ExploreGridProps {
  posts: Post[]
};

const ExploreGrid: React.FC<ExploreGridProps> = ({ posts }) => {

  const renderItem = ({ item }: { item: Post }) => {
    const { id: postId, uri } = item;

    return <ExplorePostCard
      postId={postId}
      uri={uri}
    />;
  };

  return (
    <View style={styles.container}>
      <FlatGrid
        itemDimension={100}
        showsVerticalScrollIndicator={false}
        items={posts.reverse()}
        ListEmptyComponent={() => <ListEmptyComponent placeholder='No posts found' spacing={50} />}
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