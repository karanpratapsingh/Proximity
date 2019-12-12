import { NotificationTextType } from './constants';

// Profile Screen

export type Connection = {
  id: string,
  avatar: string,
  name: string,
  handle: string
}

// Notification Screen

export type ActionUser = {
  id: string,
  avatar: string,
  handle: string
};

export type Notification = {
  actionUser: ActionUser,
  type: keyof NotificationTextType,
  createdAt: string
};

// Post View Screen

export type Author = {
  id: string,
  avatar: string,
  handle: string
};

export type Comment = {
  author: Author,
  body: string,
  createdAt: string
};

export type PostViewType = {
  author: Author,
  comments: Comment[],
  uri: string,
  likes: string,
  caption: string,
  createdAt: string
};

// Explore Screen

export type ExplorePost = {
  id: string,
  uri: string
};

export type SearchResult = {
  id: string,
  avatar: string,
  name: string,
  handle: string
};

// Message Screen

export type Participant = {
  id: string,
  avatar: string,
  handle: string,
};

export type MessageAuthor = {
  id: string
};

export type Message = {
  id: string,
  body: string,
  seen: boolean,
  author: MessageAuthor,
  createdAt: string
};

export type Chat = {
  id: string,
  participants: Participant[],
  messages: Message[]
};
