import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StackRoutes, TabBarRoutes } from './Routes';
import TabBarComponent from './TabBarComponent';
import getSlideFromRightTransitionConfig from './Transition';

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
  lazy: true,
  tabBarOptions: {
    showLabel: false,
  },
  tabBarComponent: props => <TabBarComponent  {...props} />
});

const AuthStack = createStackNavigator({
  LoginScreen: {
    screen: StackRoutes.LoginScreen
  }
}, { headerMode: 'none' });

const AppStack = createStackNavigator({
  TabNavigator: {
    screen: TabNavigator
  },
  MessageScreen: {
    screen: StackRoutes.MessageScreen
  },
  ConversationScreen: {
    screen: StackRoutes.ConversationScreen
  },
  ProfileViewScreen: {
    screen: StackRoutes.ProfileViewScreen
  },
  PostViewScreen: {
    screen: StackRoutes.PostViewScreen
  }
}, {
  headerMode: 'none',
  transitionConfig: Platform.OS === 'ios' ? undefined : getSlideFromRightTransitionConfig
});

const SwitchNavigator = createAnimatedSwitchNavigator({
  Auth: AuthStack,
  App: AppStack
}, {
  initialRouteName: 'Auth'
});

const AppNavigator = createAppContainer(SwitchNavigator as any);

export default AppNavigator;