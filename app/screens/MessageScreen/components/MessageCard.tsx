import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AppContext } from '../../../context';
import { Typography } from '../../../theme';
import { ThemeColors } from '../../../types/theme';
import { parseTimeElapsed } from '../../../utils/shared';
import { useNavigation } from 'react-navigation-hooks';
import { Routes } from '../../../constants';
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_SEEN_MESSAGE } from '../../../graphql/mutation';
import { NativeImage } from '../../../layout';
import { OnlineDotColor } from '../../../theme';

const { FontWeights, FontSizes } = Typography;

interface MessageCardProps {
  chatId: string,
  avatar: string,
  handle: string,
  authorId: string,
  messageId: string,
  messageBody: string,
  seen: boolean,
  time: string,
  isOnline: boolean
};

const MessageCard: React.FC<MessageCardProps> = ({ chatId, avatar, handle, authorId, messageId, messageBody, seen, time, isOnline }) => {

  const { user, theme } = useContext(AppContext);
  const timeElapsed = parseTimeElapsed(time);
  const { navigate } = useNavigation();
  const [messageSeen] = useMutation(MUTATION_SEEN_MESSAGE);
  console.log(isOnline);
  const setSeenAndNavigate = () => {
    if (authorId !== user.id) {
      messageSeen({ variables: { messageId } });
    }
    navigate(Routes.ConversationScreen, { chatId, avatar, handle })
  };

  const isHighlighted = authorId !== user.id && !seen;

  const highlightStyle = isHighlighted ? {
    ...FontWeights.Regular,
    color: theme.text01
  } : null;

  const onlineDotColor = OnlineDotColor[isOnline as any];

  return (
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
            {` · ${timeElapsed}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
    bottom: 2,
    right: 2,
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