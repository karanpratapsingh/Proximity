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