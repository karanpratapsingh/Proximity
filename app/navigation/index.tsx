import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  HomeScreen,
  ExploreScreen,
  UploadScreen,
  NotificationScreen,
  ProfileScreen
} from '../screens';

import TabIcon from './TabIcon';

const StackNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: <TabIcon route='HomeScreen' />
    }
  },
  ExploreScreen: {
    screen: ExploreScreen,
    navigationOptions: {
      tabBarIcon: <TabIcon route='ExploreScreen' />
    }
  },
  UploadScreen: {
    screen: UploadScreen,
    navigationOptions: {
      tabBarIcon: <TabIcon route='UploadScreen' />
    }
  },
  NotificationScreen: {
    screen: NotificationScreen,
    navigationOptions: {
      tabBarIcon: <TabIcon route='NotificationScreen' />
    }
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarIcon: <TabIcon route='ProfileScreen' />
    }
  },
}, {
  lazy: true,
  tabBarOptions: {
    showLabel: false,
  }
});

const AppNavigator = createAppContainer(StackNavigator);

export default AppNavigator;