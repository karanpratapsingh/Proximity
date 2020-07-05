import { responsiveWidth } from 'react-native-responsive-dimensions';
import {
  ConnectionsType,
  FollowInteractionType,
  IconSizesType,
  LikeActionType,
  NotificationTextType,
  PollIntervalsType,
  PostDimensionsType,
  RoutesType,
  StoragePathsType,
  AssetType,
  TimeoutsType,
  ErrorsType,
  AuthDefaultsType,
  PaginationType,
  DebounceType,
} from '@app/types/constants';

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

export const NotificationType: NotificationTextType = {
  FOLLOW: 'FOLLOW',
  COMMENT: 'COMMENT',
  LIKE: 'LIKE'
};

export const NotificationText: NotificationTextType = {
  FOLLOW: 'has started following you',
  COMMENT: 'commented on your post',
  LIKE: 'liked your post'
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
  x9: 40,
  x10: 50,
  x11: 60,
  x12: 100
};

export const PostDimensions: PostDimensionsType = {
  Small: { height: responsiveWidth(29), width: responsiveWidth(29) },
  Medium: { height: responsiveWidth(43), width: responsiveWidth(43) },
  Large: { height: responsiveWidth(90), width: responsiveWidth(90) }
};

export const PollIntervals: PollIntervalsType = {
  messages: 2 * 1000,
  profile: 1000,
  profileView: 1000,
  postView: 2 * 1000,
  interaction: 1000,
  notification: 2 * 1000,
  lastSeen: 10 * 1000,
  blockList: 1000
};

export const StoragePaths: StoragePathsType = {
  avatars: 'avatars',
  posts: 'posts'
};

export const Asset: AssetType = {
  avatar: 'avatar',
  post: 'post'
};

export const Timeouts: TimeoutsType = {
  online: 12
};

export const Errors: ErrorsType = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  UPDATE_LAST_SEEN: 'UPDATE_LAST_SEEN',
  LOAD_THEME: 'LOAD_THEME',
  INITIALIZE_FCM: 'INITIALIZE_FCM',
  INITIALIZE_CHAT: 'INITIALIZE_CHAT',
  UPDATE_FCM_TOKEN: 'UPDATE_FCM_TOKEN',
  ASSET_UPLOAD: 'ASSET_UPLOAD',
  EDIT_POST: 'EDIT_POST'
};

export const AuthDefaults: AuthDefaultsType = {
  avatar: 'https://firebasestorage.googleapis.com/v0/b/proximity-406e5.appspot.com/o/defaults%2Favatar-default.png?alt=media&token=23a37081-e594-4184-ba9f-c986ee9d3c41',
  name: 'Proximity user'
};

export const Pagination: PaginationType = {
  PAGE_SIZE: 15,
  CURSOR_SIZE: 9
};

export const Debounce: DebounceType = {
  EXPLORE_SEARCH: 400
};