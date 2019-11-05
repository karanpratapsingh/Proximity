import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import { ThemeContext } from '../../context/ThemeContext';
import { Header, ListEmptyComponent } from '../../layout';
import { ThemeColors } from '../../types';
import NotificationCard from './components/NotificationCard';

const NotificationScreen: React.FC = () => {

  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles(theme).container}>
      <Header title='Notifications' />
      <FlatGrid
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={new Array(10).fill({})}
        ListEmptyComponent={() => <ListEmptyComponent listType='notifications' spacing={60} />}
        style={styles().notificationList}
        spacing={20}
        renderItem={({ item, index }) => (
          <NotificationCard
            avatar='https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
            handle='@amy_234'
            type={null}
            time='12hrs'
          />
        )}
      />
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