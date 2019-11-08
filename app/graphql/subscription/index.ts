import gql from 'graphql-tag';

export const SUBSCRIPTION_CHAT = gql`
  Chat($chatId: String!) {
    chat(chatId: $chatId) {
      messages {
        body
      }
    }
  }
`;