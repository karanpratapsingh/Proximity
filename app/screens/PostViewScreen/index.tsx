import { useQuery } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { IconSizes, PostDimensions, Routes, PollIntervals } from '../../constants';
import { AppContext } from '../../context';
import { QUERY_POST } from '../../graphql/query';
import { GoBackHeader, NativeImage, PostViewScreenPlaceholder } from '../../layout';
import { Typography } from '../../theme';
import { ThemeColors } from '../../types';
import { parseTimeElapsed } from '../../utils/shared';
import CommentInput from './components/CommentInput';
import Comments from './components/Comments';

const { FontWeights, FontSizes } = Typography;

const PostViewScreen: React.FC = () => {

  const { user, theme } = useContext(AppContext);
  const { navigate } = useNavigation();
  const postId = useNavigationParam('postId');

  const { data: postData, loading: postLoading, error: postError } = useQuery(QUERY_POST, {
    variables: { postId },
    pollInterval: PollIntervals.postView
  });

  const navigateToProfile = userId => {

    if (userId === user.id) return;
    navigate(Routes.ProfileViewScreen, { userId });
  };

  let content = <PostViewScreenPlaceholder />;

  if (!postLoading && !postError) {
    const {
      post: {
        author: {
          id: userId,
          avatar,
          handle
        },
        comments,
        uri,
        likes,
        caption,
        createdAt
      }
    } = postData;

    content = (
      <>
        <TouchableOpacity onPress={() => navigateToProfile(userId)} style={styles().postHeader}>
          <NativeImage uri={avatar} style={styles(theme).avatarImage} />
          <View>
            <Text style={styles(theme).handleText}>{handle}</Text>
            <Text style={styles(theme).timeText}>{parseTimeElapsed(createdAt)}</Text>
          </View>
        </TouchableOpacity>
        <NativeImage uri={uri} style={styles(theme).postImage} />
        <Text style={styles(theme).likesText}>{likes} likes</Text>
        <Text style={styles(theme).captionText}>{caption}</Text>
        <Comments comments={comments} />
      </>
    );
  }

  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

  return (
    <KeyboardAvoidingView behavior={keyboardBehavior} keyboardVerticalOffset={20} style={styles(theme).container}>
      <GoBackHeader iconSize={IconSizes.x7} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles().content}>
        {content}
      </ScrollView>
      <CommentInput postId={postId} />
    </KeyboardAvoidingView>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.base
  },
  content: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatarImage: {
    height: 50,
    width: 50,
    backgroundColor: theme.placeholder,
    borderRadius: 50,
    marginRight: 12
  },
  handleText: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: theme.text01
  },
  timeText: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    color: theme.text02,
    marginTop: 2
  },
  postImage: {
    ...PostDimensions.Large,
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 10,
    backgroundColor: theme.placeholder
  },
  likesText: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    marginTop: 20,
    color: theme.text01
  },
  captionText: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: theme.text01,
    marginTop: 5,
    marginBottom: 20
  }
});

export default PostViewScreen;