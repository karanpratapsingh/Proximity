export type RoutesType = {
  App: string;
  Auth: string;
  HomeScreen: string;
  ExploreScreen: string;
  UploadScreen: string;
  NotificationScreen: string;
  ProfileScreen: string;
  TabNavigator: string;
  ProfileViewScreen: string;
  MessageScreen: string;
  ConversationScreen: string;
  PostViewScreen: string;
  LoginScreen: string;
};

export type NotificationTextType = {
  FOLLOW: string;
  COMMENT: string;
  LIKE: string;
};

export type FollowInteractionType = {
  FOLLOW: string;
  UNFOLLOW: string;
};

export type LikeActionType = {
  LIKE: string;
  UNLIKE: string;
};

export type ConnectionsType = {
  FOLLOWING: string;
  FOLLOWERS: string;
};

export type IconSizesType = {
  x00: number;
  x0: number;
  x1: number;
  x2: number;
  x3: number;
  x4: number;
  x5: number;
  x6: number;
  x7: number;
  x8: number;
  x9: number;
  x10: number;
  x11: number;
  x12: number;
};

export type Dimensions = {
  height: number;
  width: number;
};

export type PostDimensionsType = {
  Small: Dimensions;
  Medium: Dimensions;
  Large: Dimensions;
};

export type PollIntervalsType = {
  messages: number;
  profile: number;
  profileView: number;
  postView: number;
  interaction: number;
  notification: number;
  lastSeen: number;
  blockList: number;
};

export type StoragePathsType = {
  avatars: string;
  posts: string;
};

export type AssetType = {
  avatar: string;
  post: string;
};

export type TimeoutsType = {
  online: number;
};

export type ErrorsType = {
  SIGN_IN: string;
  SIGN_OUT: string;
  UPDATE_LAST_SEEN: string;
  LOAD_THEME: string;
  INITIALIZE_FCM: string;
  INITIALIZE_CHAT: string;
  UPDATE_FCM_TOKEN: string;
  ASSET_UPLOAD: string;
  EDIT_POST: string;
};

export type AuthDefaultsType = {
  avatar: string;
  name: string;
};

export type PaginationType = {
  PAGE_SIZE: number;
  CURSOR_SIZE: number;
};

export type DebounceType = {
  EXPLORE_SEARCH: number;
};