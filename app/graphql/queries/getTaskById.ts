import { gql } from '@apollo/client';

export const GET_TASK_BY_ID = gql`
query GetATaskUsingID($id: ID!) {
  getLog(id: $id) {
    task {
      content
      name
      isMcq
    }
    id
  }
}
`; 