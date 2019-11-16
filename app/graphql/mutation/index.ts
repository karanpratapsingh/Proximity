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