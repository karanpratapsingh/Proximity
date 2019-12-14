import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NotificationType, NotificationText, Routes } from '../../../constants';
import { AppContext } from '../../../context';
import { NativeImage } from '../../../layout';
import { Typography } from '../../../theme';
import { ThemeColors } from '../../../types/theme';
import { parseTimeElapsed } from '../../../utils/shared';
import { useNavigation } from 'react-navigation-hooks';

const { FontWeights, FontSizes } = Typography;

interface NotificationCardPros {
  avatar: string,
  handle: string,
  resourceId: string,
  type: any, // FIXME:
  time: string
};

const NotificationCard: React.FC<NotificationCardPros> = ({ avatar, resourceId, handle, type, time }) => {

  const { theme } = useContext(AppContext);
  const { navigate } = useNavigation();
  const notificationText = NotificationText[type];
  const parsedTime = parseTimeElapsed(time); // TODO: just refactor to utils
  const readableTime = parsedTime === 'just now' ? `${parsedTime}` : `${parsedTime} ago`;

  const navigateAction = () => {
    if (resourceId === '') return;

    if (type === NotificationType.FOLLOW) {
      navigate(Routes.ProfileViewScreen, { userId: resourceId });
    } else if (type === NotificationType.LIKE || type === NotificationType.COMMENT) {
      navigate(Routes.PostViewScreen, { postId: resourceId });
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.95} onPress={navigateAction} style={styles().container}>
      <NativeImage uri={avatar} style={styles(theme).avatarImage} />
      <View style={styles().info}>
        <Text style={styles(theme).notificationText}>
          <Text style={styles(theme).handleText}>{handle}{' '}</Text>
          {notificationText}
        </Text>
        <Text style={styles(theme).timeText}>{readableTime}</Text>
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
  notificationText: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: theme.text01
  },
  timeText: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    color: theme.text02,
    paddingTop: 5
  }
});

export default NotificationCard;