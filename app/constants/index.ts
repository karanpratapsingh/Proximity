export const Routes = {
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

export const NotificationText = {
  'FOLLOW': 'has started following you',
  'COMMENT': 'commented on your post',
  'LIKE': 'liked your post',
};

export const FollowInteractionType = {
  FOLLOW: 'FOLLOW',
  UNFOLLOW: 'UNFOLLOW'
};

export const LikeActionType = {
  LIKE: 'LIKE',
  UNLIKE: 'UNLIKE'
};

export const ConnectionsType = {
  FOLLOWING: 'FOLLOWING',
  FOLLOWERS: 'FOLLOWERS'
};

export const IconSizes = {
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

export const PostDimensions = {
  Small: { height: 105, width: 105 },
  Medium: { height: 160, width: 160 },
  Large: { height: 340, width: 340 }
};

export const ThemeType = {
  light: 'light',
  dark: 'dark'
};

export const HandleAvailableColor = {
  true: '#4caf50',
  false: '#EF5350'
};

export const PollIntervals = {
  messages: 4000,
  explore: 5 * 60 * 1000,
  profile: 1000,
  postView: 2000,
  profileView: 1000,
  connections: 2000,
  interaction: 1000,
  notification: 2000,
};