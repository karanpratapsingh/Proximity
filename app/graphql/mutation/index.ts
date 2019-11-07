import { gql } from 'apollo-boost';

export const MUTATION_CREATE_NOTIFICATION = gql`
 mutation CreateNotification($user: String!, $actionUser: String!, $type: String!) {
  createNotification(
      data: {
        user: { connect: { id: $user } }
        actionUser: { connect: { id: $actionUser } }
        type: $type
      }
  ) {
    id
  }
 }
`;