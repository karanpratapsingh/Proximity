import { useMutation } from '@apollo/react-hooks';
import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useNavigation } from 'react-navigation-hooks';
import { NotificationText, NotificationType, Routes } from '@app/constants';
import { AppContext } from '@app/context';
import { MUTATION_DELETE_NOTIFICATION } from '@app/graphql/mutation';
import { DeleteCardRightActions, NativeImage } from '@app/layout';
import { Typography } from '@app/theme';
import { ThemeColors } from '@app/types/theme';
import { parseTimeElapsed } from '@app/utils/shared';

const { FontWeights, FontSizes } = Typography;

interface NotificationCardPros {
  notificationId: string,
  avatar: string,
  handle: string,
  resourceId: string,
  type: keyof typeof NotificationType,
  time: string
};

const NotificationCard: React.FC<NotificationCardPros> = ({ notificationId, avatar, resourceId, handle, type, time }) => {

  const { theme } = useContext(AppContext);
  const { navigate } = useNavigation();
  const notificationText = NotificationText[type];
  const { readableTime } = parseTimeElapsed(time);

  const [deleteNotification, { loading: deleteNotificationLoading, called: deleteNotificationCalled }] = useMutation(MUTATION_DELETE_NOTIFICATION);

  const swipeableRef = useRef();

  const navigateAction = () => {
    if (resourceId === '') return;

    if (type === NotificationType.FOLLOW) {
      navigate(Routes.ProfileViewScreen, { userId: resourceId });
    } else if (type === NotificationType.LIKE || type === NotificationType.COMMENT) {
      navigate(Routes.PostViewScreen, { postId: resourceId });
    }
  };

  const onDelete = () => {
    if (!deleteNotificationLoading && !deleteNotificationCalled) {
      // @ts-ignore
      swipeableRef.current.close();
      deleteNotification({ variables: { notificationId } });
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
    </Swipeable>
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