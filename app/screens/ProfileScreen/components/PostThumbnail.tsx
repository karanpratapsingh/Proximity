import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ThemeColors } from '../../../types';
import { ThemeContext } from '../../../context/ThemeContext';

const PostThumbnail = ({ id, uri }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <TouchableOpacity onPress={() => null} activeOpacity={0.95} style={styles(theme).container}>
      <Image
        source={{ uri }}
        style={styles().thumbnailImage}
        resizeMode='cover'
      />
    </TouchableOpacity>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: theme.search,
    overflow: 'hidden',
    borderRadius: 5,
  },
  thumbnailImage: {
    flex: 1
  }
});

export default PostThumbnail;