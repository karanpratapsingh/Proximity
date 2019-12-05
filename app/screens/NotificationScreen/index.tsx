import { useQuery } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import EmptyNotifications from '../../../assets/svg/empty-notifications.svg';
import { AppContext } from '../../context';
import { QUERY_NOTIFICATION } from '../../graphql/query';
import { Header, NotificationScreenPlaceholder, SvgBannerType } from '../../layout';
import { ThemeColors } from '../../types';
import NotificationCard from './components/NotificationCard';

const NotificationScreen: React.FC = () => {
  const { user, theme } = useContext(AppContext);

  const { data, loading, error } = useQuery(QUERY_NOTIFICATION, {
    variables: { userId: user.id },
    pollInterval: 2000
  });

  const renderItem = ({ item }) => {
    const { actionUser, type, createdAt } = item;

    return (
      <NotificationCard
        userId={actionUser.id}
        avatar={actionUser.avatar}
        handle={actionUser.handle}
        type={type}
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
        items={notifications.reverse()}
        ListEmptyComponent={() => <SvgBannerType Svg={EmptyNotifications} topSpacing={responsiveHeight(20)} placeholder='No notifications yet' />}
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