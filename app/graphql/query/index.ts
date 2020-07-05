import gql from 'graphql-tag';

export const QUERY_SIGNIN = gql`
  query SignIn($token: String!) {
    signIn(token: $token) {
      id
      avatar
      handle
    }
  }
`;

export const QUERY_USER = gql`
 query User($userId: String!) {
    user(userId: $userId) {
      id
      avatar
      name
      handle
      about
      following {
        id
        avatar
        name
        handle
      }
      followers {
        id
        avatar
        name
        handle
      }
      posts {
        id
        uri
        createdAt
      }
    }
  }
`;

export const QUERY_USER_CONNECTIONS = gql`
 query UserConnections($userId: String!, $type: ConnectionsType!) {
    userConnections(userId: $userId, type: $type) {
      id
      avatar
      name
      handle
    }
  }
`;

export const QUERY_USER_EXISTS = gql`
  query UserExists($token: String!) {
    userExists(token: $token)
  }
`;

export const QUERY_NOTIFICATION = gql`
  query Notifications($userId: String!) {
    notifications(userId: $userId) {
      id
      actionUser {
        id
        avatar
        handle
      }
      type
      resourceId
      createdAt
    }
  }
`;

export const QUERY_CHATS = gql`
  query Chats($userId: String!) {
    chats(userId: $userId) {
      id
      participants {
        id
        avatar
        handle
        lastSeen
      }
      messages(last: 1) {
        id
        body
        seen
        author {
          id
        }
        createdAt
      }
    }
  }
`;

export const QUERY_CHAT = gql`
  query Chat($chatId: String!) {
    chat(chatId: $chatId) {
      participants {
        id
      }
      messages(last: 40) {
        id
        body
        createdAt
        author {
          id
          name
          avatar
        }
      }
    }
  }
`;

export const QUERY_DOES_FOLLOW = gql`
  query DoesFollow($userId: String!, $targetId: String!) {
    doesFollow(userId: $userId, targetId: $targetId)
  }
`;

export const QUERY_CHAT_EXISTS = gql`
  query ChatExists($userId: String!, $targetId: String!) {
    chatExists(userId: $userId, targetId: $targetId) {
      id
    }
  }
`;

export const QUERY_SEARCH_USERS = gql`
  query SearchUsers($userId: String!, $name: String!) {
    searchUsers(userId: $userId, name: $name) {
      id
      avatar
      name
      handle
    }
  }
`;

export const QUERY_HANDLE_AVAILABLE = gql`
  query IsHandleAvailable($userId: String!, $handle: String!) {
    isHandleAvailable(userId: $userId, handle: $handle)
  }
`;

export const QUERY_POST = gql`
  query Post($postId: String!) {
    post(postId: $postId) {
      author {
        id
        handle
        avatar
      }
      comments {
        id
        body
        author {
          id
          avatar
          handle
        }
        createdAt
      }
      uri
      likes
      caption
      createdAt
    }
  }
`;

export const QUERY_POSTS = gql`
  query Posts($userId: String!,$last: Int!)  {
    posts(userId: $userId, last: $last) {
      id
      uri
    }
  }
`;

export const QUERY_USER_FEED = gql`
  query UserFeed($userId: String!) {
    userFeed(userId: $userId) {
      id
      uri
      caption
      createdAt
      author {
        id
        avatar
        handle
      }
      likes
    }
  }
`;

export const QUERY_LIKE_USERS = gql`
  query LikeUsers($likes: [String!]) {
    likeUsers(likes: $likes) {
      id
      avatar
      handle
      name
    }
  }
`;

export const QUERY_BLOCKED_USERS = gql`
  query BlockedUsers($userId: String!) {
    blockedUsers(userId: $userId) {
      id
      avatar
      handle
      name
    }
  }
`;