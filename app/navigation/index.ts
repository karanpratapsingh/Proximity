import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  HomeScreen,
  ExploreScreen,
  UploadScreen,
  NotificationScreen,
  ProfileScreen
} from '../screens';

const StackNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  ExploreScreen: {
    screen: ExploreScreen
  },
  UploadScreen: {
    screen: UploadScreen
  },
  NotificationScreen: {
    screen: NotificationScreen
  },
  ProfileScreen: {
    screen: ProfileScreen
  },
}, {});

const AppNavigator = createAppContainer(StackNavigator);

export default AppNavigator;