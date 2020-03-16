import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { Routes } from '@app/constants';
import { AppContext } from '@app/context';
import { ThemeColors } from '@app/types/theme';
import { Dimensions } from '@app/types/constants';
import NativeImage from '../misc/NativeImage';

interface PostThumbnailProps {
  id: string,
  uri: string,
  dimensions: Dimensions
};

const PostThumbnail: React.FC<PostThumbnailProps> = ({ id, uri, dimensions }) => {
  const { theme } = useContext(AppContext);
  const { navigate } = useNavigation();

  const navigateToPost = () => navigate(Routes.PostViewScreen, { postId: id });

  return (
    <TouchableOpacity onPress={navigateToPost} activeOpacity={0.95} style={[styles(theme).container, { ...dimensions }]}>
      <NativeImage uri={uri} style={styles().thumbnailImage} />
    </TouchableOpacity>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    backgroundColor: theme.placeholder,
    overflow: 'hidden',
    borderRadius: 5
  },
  thumbnailImage: {
    flex: 1
  }
});

export default PostThumbnail;