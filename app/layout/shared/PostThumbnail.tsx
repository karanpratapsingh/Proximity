import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { Routes } from '../../constants';
import { AppContext } from '../../context';
import { ThemeColors } from '../../types';
import NativeImage from '../misc/NativeImage';

const PostThumbnail = ({ id, uri }) => {
  const { theme } = useContext(AppContext);
  const { navigate } = useNavigation();

  const navigateToPost = () => {
    navigate(Routes.PostViewScreen, { postId: id });
  };

  return (
    <TouchableOpacity onPress={navigateToPost} activeOpacity={0.95} style={styles(theme).container}>
      <NativeImage uri={uri} style={styles().thumbnailImage} />
    </TouchableOpacity>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: theme.placeholder,
    overflow: 'hidden',
    borderRadius: 10
  },
  thumbnailImage: {
    flex: 1
  }
});

export default PostThumbnail;