import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AppContext } from '@app/context';
import { NativeImage, DeleteCardRightActions } from '@app/layout';
import { Typography } from '@app/theme';
import { ThemeColors } from '@app/types/theme';
import { parseTimeElapsed } from '@app/utils/shared';
import { useNavigation } from 'react-navigation-hooks';
import { Routes } from '@app/constants';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_DELETE_COMMENT } from '@app/graphql/mutation';
import { longPressDeleteNotification } from '@app/utils/notifications';

const { FontWeights, FontSizes } = Typography;

interface CommentCardProps {
  postId: string,
  commentId: string,
  authorId: string,
  avatar: string,
  handle: string,
  body: string,
  time: string
};

const CommentCard: React.FC<CommentCardProps> = ({ postId, commentId, authorId, avatar, handle, body, time }) => {

  const { user, theme } = useContext(AppContext);
  const { navigate } = useNavigation();
  const { parsedTime } = parseTimeElapsed(time);

  const [deleteComment, { loading: deleteCommentLoading, called: deleteCommentCalled }] = useMutation(MUTATION_DELETE_COMMENT);

  const swipeableRef = useRef();

  const navigateToProfile = () => {
    if (authorId === user.id) return;
    navigate(Routes.ProfileViewScreen, { userId: authorId });
  };

  const onDelete = () => {
    if (!deleteCommentLoading && !deleteCommentCalled) {
      longPressDeleteNotification(() => {
        // @ts-ignore
        swipeableRef.current.close();
        deleteComment({ variables: { postId, commentId } });
      });
    }
  };

  const renderRightActions = (progress, dragX) => {
    if (authorId !== user.id) return null;
    return (
      <DeleteCardRightActions
        progress={progress}
        dragX={dragX}
        onDelete={onDelete}
      />
    );
  };

  return (
    // @ts-ignore
    <Swipeable ref={swipeableRef} useNativeAnimations containerStyle={styles().swipeable} rightThreshold={-80} renderRightActions={renderRightActions}>
      <TouchableOpacity activeOpacity={0.95} onPress={navigateToProfile} style={styles().container}>
        <NativeImage uri={avatar} style={styles(theme).avatarImage} />
        <View style={styles().info}>
          <Text style={styles(theme).commentText}>
            <Text style={styles(theme).handleText}>{handle}{' '}</Text>
            {body}
          </Text>
          <Text style={styles(theme).timeText}>{parsedTime}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  swipeable: {
    marginVertical: 5
  },
  container: {
    flexDirection: 'row',
    borderRadius: 5,
    marginVertical: 5
  },
  avatarImage: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: theme.placeholder
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10
  },
  handleText: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: theme.text01
  },
  commentText: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: theme.text01
  },
  timeText: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    color: theme.text02,
    paddingTop: 2
  }
});

export default CommentCard;