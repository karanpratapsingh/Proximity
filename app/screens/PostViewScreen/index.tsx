import { useLazyQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import React, { createRef, useContext, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { IconSizes, LikeAction, PostDimensions, Routes } from '@app/constants';
import { AppContext } from '@app/context';
import { MUTATION_DELETE_POST, MUTATION_LIKE_INTERACTION } from '@app/graphql/mutation';
import { QUERY_POST } from '@app/graphql/query';
import { SUBSCRIPTION_POST } from '@app/graphql/subscription';
import { BounceView, ConfirmationModal, GoBackHeader, IconButton, NativeImage, PostViewScreenPlaceholder } from '@app/layout';
import { ThemeStatic, Typography } from '@app/theme';
import { ThemeColors } from '@app/types/theme';
import { deleteFromStorage } from '@app/utils/firebase';
import { postDeletedNotification } from '@app/utils/notifications';
import { parseLikes, parseTimeElapsed } from '@app/utils/shared';
import CommentInput from './components/CommentInput';
import Comments from './components/Comments';
import EditPostBottomSheet from './components/EditPostBottomSheet';
import LikeBounceAnimation from './components/LikeBounceAnimation';
import LikesBottomSheet from './components/LikesBottomSheet';
import PostOptionsBottomSheet from './components/PostOptionsBottomSheet';

const { FontWeights, FontSizes } = Typography;

const PostViewScreen: React.FC = () => {

  const { user, theme } = useContext(AppContext);
  const { navigate, goBack } = useNavigation();
  const postId = useNavigationParam('postId');

  const [postData, setPostData] = useState(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [lastTap, setLastTap] = useState(Date.now());

  const [
    queryPost, {
      data: postQueryData,
      called: postQueryCalled,
      loading: postQueryLoading,
      error: postQueryError
    }] = useLazyQuery(QUERY_POST, {
      variables: { postId },
      fetchPolicy: 'network-only'
    });

  const { data: postSubscriptionData, loading: postSubscriptionLoading } = useSubscription(SUBSCRIPTION_POST, { variables: { postId } });
  const [deletePost] = useMutation(MUTATION_DELETE_POST);

  const scrollViewRef = useRef();
  const postOptionsBottomSheetRef = useRef();
  const editPostBottomSheetRef = useRef();
  const likesBottomSheetRef = useRef();
  const likeBounceAnimationRef = createRef();

  useEffect(() => {
    if (!postSubscriptionLoading) {
      setPostData(postSubscriptionData);
    } else if (postSubscriptionLoading) {
      if (postQueryCalled && !postQueryLoading) {
        setPostData(postQueryData);
      } else if (!postQueryCalled) {
        queryPost();
      }
    }
  }, [postQueryData, postQueryCalled, postQueryLoading, postSubscriptionData, postSubscriptionLoading]);

  const [likeInteraction, { loading: likeInteractionLoading }] = useMutation(MUTATION_LIKE_INTERACTION);

  const confirmationToggle = () => {
    setIsConfirmModalVisible(!isConfirmModalVisible);
  };

  const navigateToProfile = (userId: string) => {

    if (userId === user.id) return;
    navigate(Routes.ProfileViewScreen, { userId });
  };

  const openOptions = () => {
    // @ts-ignore
    postOptionsBottomSheetRef.current.open();
  };

  const closeOptions = () => {
    // @ts-ignore
    postOptionsBottomSheetRef.current.close();
  };

  const openLikes = () => {
    // @ts-ignore
    likesBottomSheetRef.current.open();
  };

  const handleDoubleTap = (isLiked: boolean) => {
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
    } else {
      // @ts-ignore
      likeBounceAnimationRef.current.animate();
    }

    return likeInteraction({ variables });
  };

  const onPostEdit = () => {
    closeOptions();
    // @ts-ignore
    editPostBottomSheetRef.current.open();
  };

  const onPostDelete = () => {
    closeOptions();
    confirmationToggle();
  };

  const onDeleteConfirm = (uri: string) => {
    confirmationToggle();
    goBack();
    postDeletedNotification();
    deletePost({ variables: { postId } });
    deleteFromStorage(uri);
  };

  let content = <PostViewScreenPlaceholder />;

  if (postQueryCalled && !postQueryLoading && !postQueryError && postData) {

    const {
      // @ts-ignore
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

    const { readableTime } = parseTimeElapsed(createdAt);
    const isLiked = likes.includes(user.id);
    const readableLikes = parseLikes(likes.length);

    content = (
      <>
        <TouchableOpacity activeOpacity={0.90} onPress={() => navigateToProfile(userId)} style={styles().postHeader}>
          <NativeImage uri={avatar} style={styles(theme).avatarImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles(theme).handleText}>{handle}</Text>
            <Text style={styles(theme).timeText}>{readableTime}</Text>
          </View>
          <IconButton
            onPress={openOptions}
            Icon={() => <Entypo
              name='dots-three-vertical'
              size={IconSizes.x4}
              color={theme.text01}
            />}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDoubleTap(isLiked)} activeOpacity={1}>
          <NativeImage uri={uri} style={styles(theme).postImage} />
          <LikeBounceAnimation ref={likeBounceAnimationRef} />
        </TouchableOpacity>
        <View style={styles().likes}>
          <BounceView
            scale={1.50}
            onPress={() => likeInteractionHandler(isLiked)}>
            <AntDesign
              name='heart'
              color={isLiked ? ThemeStatic.like : ThemeStatic.unlike}
              size={IconSizes.x5}
            />
          </BounceView>
          <Text onPress={openLikes} style={styles(theme).likesText}>{readableLikes}</Text>
        </View>
        <Text style={styles(theme).captionText}>
          <Text onPress={() => navigateToProfile(userId)} style={styles(theme).handleText}>{handle}{' '}</Text>
          {caption}
        </Text>
        <Comments postId={postId} comments={comments} />
      </>
    );
  }

  let bottomSheets;

  if (postQueryCalled && !postQueryLoading && !postQueryError && postData) {
    const {
      // @ts-ignore
      post: {
        author: {
          id: authorId
        },
        uri,
        likes,
        caption
      }
    } = postData;

    bottomSheets = (
      <>
        <PostOptionsBottomSheet
          ref={postOptionsBottomSheetRef}
          authorId={authorId}
          postId={postId}
          onPostEdit={onPostEdit}
          onPostDelete={onPostDelete}
        />
        <EditPostBottomSheet
          ref={editPostBottomSheetRef}
          postId={postId}
          caption={caption}
        />
        <ConfirmationModal
          label='Delete'
          title='Delete post?'
          description={`Do you want to delete the current post? Post won't be recoverable later`}
          color={ThemeStatic.delete}
          isVisible={isConfirmModalVisible}
          toggle={confirmationToggle}
          onConfirm={() => onDeleteConfirm(uri)}
        />
        <LikesBottomSheet
          ref={likesBottomSheetRef}
          likes={likes}
          onUserPress={navigateToProfile}
        />
      </>
    );
  }

  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

  return (
    <KeyboardAvoidingView behavior={keyboardBehavior} keyboardVerticalOffset={20} style={styles(theme).container}>
      <GoBackHeader iconSize={IconSizes.x7} />
      <ScrollView
        // @ts-ignore
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={styles().content}>
        {content}
      </ScrollView>
      <CommentInput postId={postId} scrollViewRef={scrollViewRef} />
      {bottomSheets}
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
    marginTop: 10,
    marginBottom: 20
  }
});

export default PostViewScreen;