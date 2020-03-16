import { useQuery } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import EmptyNotifications from '@app/assets/svg/empty-notifications.svg';
import { PollIntervals } from '@app/constants';
import { AppContext } from '@app/context';
import { QUERY_NOTIFICATION } from '@app/graphql/query';
import { Header, NotificationScreenPlaceholder, SvgBanner } from '@app/layout';
import { ThemeColors } from '@app/types/theme';
import NotificationCard from './components/NotificationCard';

const NotificationScreen: React.FC = () => {
  const { user, theme } = useContext(AppContext);

  const { data, loading, error } = useQuery(QUERY_NOTIFICATION, {
    variables: { userId: user.id },
    pollInterval: PollIntervals.notification
  });

  const renderItem = ({ item }) => {
    const { id: notificationId, actionUser, type, resourceId, createdAt } = item;

    return (
      <NotificationCard
        notificationId={notificationId}
        avatar={actionUser.avatar}
        handle={actionUser.handle}
        type={type}
        resourceId={resourceId}
        time={createdAt}
      />
    );
  };

  let content = <NotificationScreenPlaceholder />;

  if (!loading && !error) {
    const { notifications } = data;
    content = (
      <FlatGrid
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={notifications}
        ListEmptyComponent={() => <SvgBanner Svg={EmptyNotifications} spacing={20} placeholder='No notifications yet' />}
        style={styles().notificationList}
        spacing={20}
        renderItem={renderItem}
      />
    );
  }

  return (
    <View style={styles(theme).container}>
      <Header title='Notifications' />
      {content}
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.base
  },
  notificationList: {
    flex: 1,
    paddingHorizontal: 4
  }
});

export default NotificationScreen;