import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { TabBarRoutes, StackRoutes } from './Routes'
import TabBarComponent from './TabBarComponent';

const TabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: TabBarRoutes.HomeScreen
  },
  ExploreScreen: {
    screen: TabBarRoutes.ExploreScreen
  },
  UploadScreen: {
    screen: TabBarRoutes.UploadScreen
  },
  NotificationScreen: {
    screen: TabBarRoutes.NotificationScreen
  },
  ProfileScreen: {
    screen: TabBarRoutes.ProfileScreen
  },
}, {
  initialRouteName: 'NotificationScreen',
  lazy: true,
  tabBarOptions: {
    showLabel: false,
  },
  tabBarComponent: props => <TabBarComponent  {...props} />
});

const StackNavigator = createStackNavigator({
  TabNavigator: {
    screen: TabNavigator
  },
  MessageScreen: {
    screen: StackRoutes.MessageScreen
  }
}, { headerMode: 'none' });

const AppNavigator = createAppContainer(StackNavigator);

export default AppNavigator;