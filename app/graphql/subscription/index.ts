import gql from 'graphql-tag';

export const SUBSCRIPTION_CHAT = gql`
  subscription Chat($chatId: String!) {
    chat(chatId: $chatId) {
      messages(last: 20) {
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