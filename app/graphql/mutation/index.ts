import gql from 'graphql-tag';

export const MUTATION_ADD_MESSAGE = gql`
  mutation AddChatMessage($chatId: String!, $authorId: String!, $body: String!) {
    addChatMessage(
      chatId: $chatId
      authorId: $authorId
      body: $body
    ) {
      messages {
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

export const MUTATION_UPDATE_FOLLOWING = gql`
  mutation UpdateFollowing($userId: String!, $targetId: String!, $action: UpdateFollowingAction!) {
    updateFollowing(
      userId: $userId
      targetId: $targetId
      action: $action
    ) {
      id
    }
  }
`;

export const MUTATION_CREATE_TEMPORARY_CHAT = gql`
  mutation CreateTemporaryChat {
    createTemporaryChat {
      id
    }
  }
`;

export const MUTATION_CONNECT_CHAT_TO_USERS = gql`
  mutation ConnectChatToUsers($chatId: String!, $userId: String!, $targetId: String!) {
    connectChatToUsers(
      chatId: $chatId,
      userId: $userId,
      targetId: $targetId
    ) {
      id
    }
  }
`;

export const MUTATION_UPDATE_USER = gql`
  mutation UpdateUser($userId: String!, $avatar: String!, $name: String!, $handle: String!, $about: String!) {
    updateUser(
      userId: $userId,
      avatar: $avatar,
      name: $name,
      handle: $handle,
      about: $about
    ) {
      id
      avatar
      handle
    }
  }
`;

export const MUTATION_CREATE_POST = gql`
  mutation CreatePost($userId: String!, $uri: String!, $caption: String) {
    createPost(userId: $userId, uri: $uri, caption: $caption) {
      id
    }
  }
`;

export const MUTATION_UPDATE_FCM_TOKEN = gql`
  mutation UpdateFcmToken($userId: String!, $fcmToken: String!) {
    updateFcmToken(userId: $userId, fcmToken: $fcmToken) {
      id
    }
  }
`;

export const MUTATION_CREATE_USER = gql`
  mutation CreateUser($token: String!, $avatar: String, $name: String!) {
    createUser(token: $token, avatar: $avatar, name: $name) {
      id
      avatar
      handle
    }
  }
`;

export const MUTATION_ADD_COMMENT = gql`
  mutation AddComment($userId: String!, $postId: String!, $body: String!) {
    addComment(userId: $userId, postId: $postId, body: $body) {
      id
    }
  }
`;

export const MUTATION_LIKE_INTERACTION = gql`
  mutation LikeInteraction($postId: String!, $userId: String!, $action: LikeAction!) {
    likeInteraction(postId: $postId, userId: $userId, action: $action) {
      id
    }
  }
`;