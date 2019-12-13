import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NotificationText, Routes } from '../../../constants';
import { AppContext } from '../../../context';
import { NativeImage } from '../../../layout';
import { Typography } from '../../../theme';
import { ThemeColors } from '../../../types/theme';
import { parseTimeElapsed } from '../../../utils/shared';
import { useNavigation } from 'react-navigation-hooks';

const { FontWeights, FontSizes } = Typography;

interface NotificationCardPros {
  userId: string,
  avatar: string,
  handle: string,
  type: any, // FIXME:
  time: string
};

const NotificationCard: React.FC<NotificationCardPros> = ({ userId, avatar, handle, type, time }) => {

  const { theme } = useContext(AppContext);
  const { navigate } = useNavigation();
  const notificationText = NotificationText[type];
  const parsedTime = parseTimeElapsed(time);
  const readableTime = parsedTime === 'just now' ? `${parsedTime}` : `${parsedTime} ago`;

  const navigateToProfile = () => {
    navigate(Routes.ProfileViewScreen, { userId });
  };

  return (
    <TouchableOpacity activeOpacity={0.95} onPress={navigateToProfile} style={styles().container}>
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