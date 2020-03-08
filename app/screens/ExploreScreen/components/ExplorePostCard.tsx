import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { Routes, PostDimensions } from '@app/constants';
import { NativeImage } from '@app/layout';
import { AppContext } from '@app/context';
import { ThemeColors } from '@app/types/theme';

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
    borderRadius: 5
  },
  postImage: {
    flex: 1,
    backgroundColor: theme.placeholder
  }
});

export default ExplorePostCard;