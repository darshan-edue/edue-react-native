import { gql } from '@apollo/client';

export const GET_CURRENT_TASK = gql`
  query getCurrentTask($id: ID!) {
    currentTask(id: $id) {
      task {
        id
        isMcq
        name
        content
      }
    }
  }
`; 