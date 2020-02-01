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
    )
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
  mutation CreateUser($token: String!, $avatar: String, $name: String!, $email: String!) {
    createUser(token: $token, avatar: $avatar, name: $name, email: $email) {
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

export const MUTATION_SEEN_MESSAGE = gql`
  mutation MessageSeen($messageId: String!) {
    messageSeen(messageId: $messageId) {
      id
    }
  }
`;

export const MUTATION_LAST_SEEN = gql`
  mutation LastSeen($userId: String!) {
    updateLastSeen(userId: $userId) {
      chats {
        messages(last: 1) {
          author {
            id
          }
          seen
        }
      }
    }
  }
`;

export const MUTATION_DELETE_CHAT = gql`
  mutation DeleteChat($chatId: String!) {
    deleteChat(chatId: $chatId) {
      id
    }
  }
`;

export const MUTATION_REPORT_POST = gql`
  mutation ReportPost($postId: String!) {
    reportPost(postId: $postId) {
      id
    }
  }
`;

export const MUTATION_EDIT_POST = gql`
  mutation EditPost($postId: String!, $caption: String!) {
    editPost(postId: $postId, caption: $caption) {
      id
    }
  }
`;

export const MUTATION_DELETE_POST = gql`
  mutation DeletePost($postId: String!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;

export const MUTATION_DELETE_COMMENT = gql`
  mutation DeleteComment($postId: String!, $commentId: String!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
    }
  }
`;

export const MUTATION_DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($notificationId: String!) {
    deleteNotification(notificationId: $notificationId) {
      id
    }
  }
`;

export const MUTATION_BLOCK_USER = gql`
  mutation BlockUser($from: String!, $to: String!) {
    blockUser(from: $from, to: $to)
  }
`;

export const MUTATION_UNBLOCK_USER = gql`
  mutation UnblockUser($from: String!, $to: String!) {
    unblockUser(from: $from, to: $to)
  }
`;