import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeColors } from '@app/types/theme';
import TabIcon from './TabIcon';
import { TabBarRoutes } from '../Routes';
import { AppContext } from '@app/context';

const TabBarComponent = ({ navigation, ...data }) => {
  const { theme } = useContext(AppContext);
  const currentRouteName = navigation.state.routes[navigation.state.index].key;
  return (
    <View style={styles(theme).container}>
      {Object.keys(TabBarRoutes).map(key => (
        <TouchableOpacity key={key} activeOpacity={0.95} style={styles().icon} onPress={() => navigation.navigate(key)}>
          <TabIcon route={key} isActive={currentRouteName === key} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: theme.base
  },
  icon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default TabBarComponent;