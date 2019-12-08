import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { Routes, PostDimensions } from '../../../constants';
import { NativeImage } from '../../../layout';
import { AppContext } from '../../../context';
import { ThemeColors } from '../../../types/theme';

interface ExplorePostCardProps {
  postId: string,
  uri: string
};

const ExplorePostCard: React.FC<ExplorePostCardProps> = ({ postId, uri }) => {

  const { theme } = useContext(AppContext);
  const { navigate } = useNavigation();

  const navigateToPost = () => {
    navigate(Routes.PostViewScreen, { postId });
  };

  return (
    <TouchableOpacity onPress={navigateToPost} activeOpacity={0.95} style={styles().container}>
      <NativeImage uri={uri} style={styles(theme).postImage} />
    </TouchableOpacity>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    ...PostDimensions.Small,
    overflow: 'hidden',
    borderRadius: 10
  },
  postImage: {
    flex: 1,
    backgroundColor: theme.placeholder
  }
});

export default ExplorePostCard;