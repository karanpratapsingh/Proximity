import { gql } from 'apollo-boost';

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
      }
      followers {
        id
      }
      posts {
        uri
      }
    }
}
`;

export const QUERY_NOTIFICATION = gql`
  query Notifications($userId: String!) {
    notifications(userId: $userId) {
      actionUser {
        avatar
        handle
      }
      type
      createdAt
    }
  }
`;
