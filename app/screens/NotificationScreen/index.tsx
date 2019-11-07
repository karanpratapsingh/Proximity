import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import { ThemeContext } from '../../context/ThemeContext';
import { Header, ListEmptyComponent, NotificationScreenPlaceholder } from '../../layout';
import { ThemeColors } from '../../types';
import NotificationCard from './components/NotificationCard';
import { QUERY_NOTIFICATION } from '../../graphql/query';
import { useQuery } from '@apollo/react-hooks';

const NotificationScreen: React.FC = () => {

  const { data, loading } = useQuery(QUERY_NOTIFICATION, {
    variables: { userId: 'ck2oj3x2n001w0765e34k94w1' }
  });

  const { theme } = useContext(ThemeContext);

  let content = <NotificationScreenPlaceholder />;

  if (!loading) {
    const { notifications } = data;
    content = (
      <FlatGrid
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={notifications.reverse()}
        ListEmptyComponent={() => <ListEmptyComponent listType='notifications' spacing={60} />}
        style={styles().notificationList}
        spacing={20}
        renderItem={({ item }) => {
          const { actionUser, type, createdAt } = item;

          return (
            <NotificationCard
              avatar={actionUser.avatar}
              handle={actionUser.handle}
              type={type}
              time={createdAt}
            />
          )
        }}
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