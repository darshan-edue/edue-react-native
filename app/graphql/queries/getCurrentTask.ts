import { gql } from '@apollo/client';

export const GET_CURRENT_TASK = gql`
  query getCurrentTask($id: ID!) {
    assignmentLog(id: $id) {
      task {
        id
        isMcq
        name
        content
        options {
          edges {
            node {
              id
              content
            }
          }
        }
      }
    }
  }
`; 