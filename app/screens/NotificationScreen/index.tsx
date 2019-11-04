import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { Header } from '../../layout';
import { ThemeColors } from '../../types';

const NotificationScreen: React.FC = () => {

  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles(theme).container}>
      <Header title='Notifications' />
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