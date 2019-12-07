import { useQuery, useMutation } from '@apollo/react-hooks';
import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { IconSizes, PostDimensions, Routes, PollIntervals, LikeAction } from '../../constants';
import { AppContext } from '../../context';
import { QUERY_POST } from '../../graphql/query';
import { GoBackHeader, NativeImage, PostViewScreenPlaceholder, IconButton } from '../../layout';
import { Typography, ThemeStatic } from '../../theme';
import { ThemeColors } from '../../types/theme';
import { parseTimeElapsed } from '../../utils/shared';
import CommentInput from './components/CommentInput';
import Comments from './components/Comments';
import { MUTATION_LIKE_INTERACTION } from '../../graphql/mutation';

import AntDesign from 'react-native-vector-icons/AntDesign';

const { FontWeights, FontSizes } = Typography;

const PostViewScreen: React.FC = () => {

  const { user, theme } = useContext(AppContext);
  const { navigate } = useNavigation();
  const postId = useNavigationParam('postId');

  const [lastTap, setLastTap] = useState(Date.now());

  const { data: postData, loading: postLoading, error: postError } = useQuery(QUERY_POST, {
    variables: { postId },
    pollInterval: PollIntervals.postView
  });

  const [likeInteraction, { loading: likeInteractionLoading }] = useMutation(MUTATION_LIKE_INTERACTION);

  const navigateToProfile = (userId: string) => {

    if (userId === user.id) return;
    navigate(Routes.ProfileViewScreen, { userId });
  };

  const handleDoubleTap = async (isLiked: boolean) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 500;
    if (now - lastTap < DOUBLE_PRESS_DELAY) {
      likeInteractionHandler(isLiked);
    } else {
      setLastTap(now);
    }
  };

  const likeInteractionHandler = (isLiked: boolean) => {
    if (likeInteractionLoading) return;

    const variables = {
      postId,
      userId: user.id,
      action: LikeAction.LIKE
    };

    if (isLiked) {
      variables.action = LikeAction.UNLIKE
    }

    return likeInteraction({ variables });
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

    const isLiked = likes.includes(user.id);

    content = (
      <>
        <TouchableOpacity onPress={() => navigateToProfile(userId)} style={styles().postHeader}>
          <NativeImage uri={avatar} style={styles(theme).avatarImage} />
          <View>
            <Text style={styles(theme).handleText}>{handle}</Text>
            <Text style={styles(theme).timeText}>{parseTimeElapsed(createdAt)}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDoubleTap(isLiked)} activeOpacity={1}>
          <NativeImage uri={uri} style={styles(theme).postImage} />
        </TouchableOpacity>
        <View style={styles().likes}>
          <IconButton
            style={{ width: undefined }}
            Icon={() =>
              <AntDesign
                name='heart'
                color={isLiked ? ThemeStatic.like : ThemeStatic.unlike}
                size={IconSizes.x5}
              />
            }
            onPress={() => likeInteractionHandler(isLiked)}
          />
          <Text style={styles(theme).likesText}>{likes.length} likes</Text>
        </View>
        <Text style={styles(theme).captionText}>
          <Text style={styles(theme).handleText}>{handle}{'  '}</Text>
          {caption}
        </Text>
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
  likes: {
    flexDirection: 'row',
    marginTop: 20
  },
  likesText: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    marginLeft: 10,
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