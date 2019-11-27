import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeImage } from '../../../layout';
import { Typography, ThemeStatic } from '../../../theme';
import { useNavigation } from 'react-navigation-hooks';
import { Routes } from '../../../constants';

const { FontWeights, FontSizes } = Typography;

interface PostCardProps {
  avatar: string,
  name: string,
  time: string,
  uri: string,
  likes: number,
  caption: string
};

const PostCard: React.FC<PostCardProps> = ({ avatar, name, time, uri, likes, caption }) => {

  const { navigate } = useNavigation();

  const navigateToPost = () => {
    navigate(Routes.PostViewScreen, { id: '123' });
  };

  return (
    <TouchableOpacity onPress={navigateToPost} activeOpacity={0.9} style={styles.container}>
      <NativeImage
        uri={uri}
        style={styles.postImage}
      />

      <View style={styles.upperContent}>
        <NativeImage
          uri={avatar}
          style={styles.avatarImage}
        />
        <View>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </View>

      <View style={styles.lowerContent}>
        <Text style={styles.likesText}>{likes} likes</Text>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.captionText}>{caption}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: 335,
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: ThemeStatic.black,
    overflow: 'hidden',
    borderRadius: 10
  },
  postImage: {
    position: 'absolute',
    height: 400,
    width: 335
  },
  avatarImage: {
    height: 50,
    width: 50,
    backgroundColor: ThemeStatic.placeholder,
    borderRadius: 50,
    marginRight: 12
  },
  upperContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  lowerContent: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  nameText: {
    ...FontWeights.Bold,
    ...FontSizes.Body,
    color: ThemeStatic.white
  },
  timeText: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    color: ThemeStatic.white,
    marginTop: 2,
  },
  likesText: {
    ...FontWeights.Bold,
    ...FontSizes.Body,
    color: ThemeStatic.white
  },
  captionText: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: ThemeStatic.white,
    marginTop: 5
  }
});

export default PostCard;