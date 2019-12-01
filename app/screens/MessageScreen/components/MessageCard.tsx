import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AppContext } from '../../../context';
import { Typography } from '../../../theme';
import { ThemeColors } from '../../../types';
import { parseTimeElapsed } from '../../../utils/shared';
import { useNavigation } from 'react-navigation-hooks';
import { Routes } from '../../../constants';

const { FontWeights, FontSizes } = Typography;

const MessageCard = ({ chatId, avatar, handle, lastMessage, time }) => {

  const { theme } = useContext(AppContext);
  const timeElapsed = parseTimeElapsed(time);
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.90} onPress={() => navigate(Routes.ConversationScreen, { chatId, handle })} style={styles().container}>
      <Image
        source={{ uri: avatar }}
        style={styles(theme).avatarImage}
      />
      <View style={styles().info}>
        <Text style={styles(theme).handleText}>{handle}{' '}</Text>
        <View style={styles(theme).time}>
          <Text numberOfLines={1} ellipsizeMode='tail' style={styles(theme).messageText}>
            {lastMessage}
          </Text>
          <Text style={styles(theme).timeText}>
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
  avatarImage: {
    height: 50,
    width: 50,
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
  time: {
    flexDirection: 'row',
    paddingTop: 5,
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