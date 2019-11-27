import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ThemeColors } from '../../types';
import { AppContext } from '../../context';

const PostThumbnail = ({ id, uri }) => {
  const { theme } = useContext(AppContext);
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
    backgroundColor: theme.placeholder,
    overflow: 'hidden',
    borderRadius: 10
  },
  thumbnailImage: {
    flex: 1
  }
});

export default PostThumbnail;