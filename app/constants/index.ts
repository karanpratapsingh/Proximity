import { responsiveWidth } from 'react-native-responsive-dimensions';
import {
  ConnectionsType,
  FollowInteractionType,
  HandleAvailableColorType,
  IconSizesType,
  LikeActionType,
  NotificationTextType,
  PollIntervalsType,
  PostDimensionsType,
  RoutesType
} from '../types/constants';
import { ThemeVariantType } from '../types/theme';

export const Routes: RoutesType = {
  App: 'App',
  Auth: 'Auth',
  HomeScreen: 'HomeScreen,',
  ExploreScreen: 'ExploreScreen,',
  UploadScreen: 'UploadScreen,',
  NotificationScreen: 'NotificationScreen,',
  ProfileScreen: 'ProfileScreen,',
  TabNavigator: 'TabNavigator',
  ProfileViewScreen: 'ProfileViewScreen',
  MessageScreen: 'MessageScreen',
  ConversationScreen: 'ConversationScreen',
  PostViewScreen: 'PostViewScreen',
  LoginScreen: 'LoginScreen'
};

export const NotificationText: NotificationTextType = {
  FOLLOW: 'has started following you',
  COMMENT: 'commented on your post',
  LIKE: 'liked your post',
};

export const FollowInteraction: FollowInteractionType = {
  FOLLOW: 'FOLLOW',
  UNFOLLOW: 'UNFOLLOW'
};

export const LikeAction: LikeActionType = {
  LIKE: 'LIKE',
  UNLIKE: 'UNLIKE'
};

export const Connections: ConnectionsType = {
  FOLLOWING: 'FOLLOWING',
  FOLLOWERS: 'FOLLOWERS'
};

export const IconSizes: IconSizesType = {
  x00: 4,
  x0: 6,
  x1: 10,
  x2: 12,
  x3: 14,
  x4: 16,
  x5: 20,
  x6: 24,
  x7: 28,
  x8: 32,
  x9: 40
};

// export const PostDimensions: PostDimensionsType = {
//   Small: { height: 105, width: 105 },
//   Medium: { height: 160, width: 160 },
//   Large: { height: 340, width: 340 }
// };

export const PostDimensions: PostDimensionsType = {
  Small: { height: responsiveWidth(28.5), width: responsiveWidth(28.5) },
  Medium: { height: responsiveWidth(43), width: responsiveWidth(43) },
  Large: { height: responsiveWidth(90), width: responsiveWidth(90) }
};

export const ThemeVariant: ThemeVariantType = {
  light: 'light',
  dark: 'dark'
};

export const HandleAvailableColor: HandleAvailableColorType = {
  true: '#4caf50',
  false: '#EF5350'
};

export const PollIntervals: PollIntervalsType = {
  messages: 4000,
  explore: 5 * 60 * 1000,
  profile: 1000,
  postView: 2000,
  profileView: 1000,
  connections: 2000,
  interaction: 1000,
  notification: 2000,
};