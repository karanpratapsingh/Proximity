import { useMutation } from '@apollo/react-hooks';
import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useNavigation } from 'react-navigation-hooks';
import { Routes } from '@app/constants';
import { AppContext } from '@app/context';
import { MUTATION_SEEN_MESSAGE, MUTATION_DELETE_CHAT } from '@app/graphql/mutation';
import { NativeImage, DeleteCardRightActions } from '@app/layout';
import { OnlineDotColor, Typography } from '@app/theme';
import { ThemeColors } from '@app/types/theme';
import { parseTimeElapsed } from '@app/utils/shared';
import { longPressDeleteNotification } from '@app/utils/notifications';

const { FontWeights, FontSizes } = Typography;

interface MessageCardProps {
  chatId: string,
  participantId: string,
  avatar: string,
  handle: string,
  authorId: string,
  messageId: string,
  messageBody: string,
  seen: boolean,
  time: string,
  isOnline: boolean
};

const MessageCard: React.FC<MessageCardProps> = ({ chatId, participantId, avatar, handle, authorId, messageId, messageBody, seen, time, isOnline }) => {

  const { user, theme } = useContext(AppContext);
  const { parsedTime } = parseTimeElapsed(time);
  const { navigate } = useNavigation();
  const [messageSeen] = useMutation(MUTATION_SEEN_MESSAGE);
  const [deleteChat, { loading: deleteChatLoading, called: deleteChatCalled }] = useMutation(MUTATION_DELETE_CHAT);

  const setSeenAndNavigate = () => {
    if (authorId !== user.id) {
      messageSeen({ variables: { messageId } });
    }
    navigate(Routes.ConversationScreen, { chatId, avatar, handle, targetId: participantId })
  };

  const isHighlighted = authorId !== user.id && !seen;

  const highlightStyle = isHighlighted ? {
    ...FontWeights.Regular,
    color: theme.text01
  } : null;

  const onlineDotColor = OnlineDotColor[isOnline as any];
  const swipeableRef = useRef();

  const onDelete = () => {
    if (!deleteChatLoading && !deleteChatCalled) {
      longPressDeleteNotification(() => {
        // @ts-ignore
        swipeableRef.current.close();
        deleteChat({ variables: { chatId } });
      });
    }
  };

  const renderRightActions = (progress, dragX) => (
    <DeleteCardRightActions
      progress={progress}
      dragX={dragX}
      onDelete={onDelete}
    />
  );

  return (
    // @ts-ignore
    <Swipeable ref={swipeableRef} useNativeAnimations rightThreshold={-80} renderRightActions={renderRightActions}>
      <TouchableOpacity activeOpacity={0.90} onPress={setSeenAndNavigate} style={styles().container}>
        <View style={styles().avatar}>
          <NativeImage
            uri={avatar}
            style={styles(theme).avatarImage}
          />
          <View style={[styles().onlineDot, { backgroundColor: onlineDotColor }]} />
        </View>
        <View style={styles().info}>
          <Text style={styles(theme).handleText}>{handle}{' '}</Text>
          <View style={styles(theme).content}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={[styles(theme).messageText, highlightStyle]}>
              {messageBody}
            </Text>
            <Text style={[styles(theme).timeText, highlightStyle]}>
              {` · ${parsedTime}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 5
  },
  avatar: {
    height: 50,
    width: 50
  },
  avatarImage: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: theme.placeholder
  },
  onlineDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    bottom: 2.5,
    right: 2.5,
    borderRadius: 10
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
  content: {
    flexDirection: 'row',
    paddingTop: 5
  },
  messageText: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    maxWidth: '70%',
    color: theme.text02
  },
  timeText: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    color: theme.text02
  }
});

export default MessageCard;