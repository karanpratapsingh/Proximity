import React from 'react';
import { StyleSheet } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import NotificationCard from '../NotificationCard';

const NotificationList = () => {
  return (
    <FlatGrid
      itemDimension={responsiveWidth(85)}
      showsVerticalScrollIndicator={false}
      items={new Array(20).fill({})}
      style={styles.container}
      spacing={20}
      renderItem={({ item, index }) => (
        <NotificationCard
          avatar='https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
          handle='@amy_234'
          type={null}
          time={'12hrs'}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4
  }
});

export default NotificationList;