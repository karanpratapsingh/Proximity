import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListEmptyComponent } from '../../../layout';
import ExplorePostCard from './ExplorePostCard';
import { FlatGrid } from 'react-native-super-grid';

const ExploreGrid = ({ posts }) => {

  const renderItem = ({ item }) => {
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