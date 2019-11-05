import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { Header } from '../../layout';
import { ThemeColors } from '../../types';
import NotificationList from './components/NotificationList';

const NotificationScreen: React.FC = () => {

  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles(theme).container}>
      <Header title='Notifications' />
      <NotificationList />
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.base
  }
});

export default NotificationScreen;