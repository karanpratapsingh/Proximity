import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { Routes, PostDimensions } from '../../../constants';
import { NativeImage } from '../../../layout';

const ExplorePostCard = ({ postId, uri }) => {
  const { navigate } = useNavigation();

  const navigateToPost = () => {
    navigate(Routes.PostViewScreen, { postId });
  };

  return (
    <TouchableOpacity onPress={navigateToPost} activeOpacity={0.95} style={styles.container}>
      <NativeImage uri={uri} style={styles.postImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...PostDimensions.Small,
    overflow: 'hidden',
    borderRadius: 10
  },
  postImage: {
    flex: 1
  }
});

export default ExplorePostCard;