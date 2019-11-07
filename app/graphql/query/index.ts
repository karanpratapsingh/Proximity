import { gql } from 'apollo-boost';

export const QUERY_USER = gql`
 query User($userId: String!) {
    user(userId: $userId) {
      id
      avatar
      name
      handle
      about
    }
}
`;
