import { gql } from '@apollo/client';

export const GET_ALL_TASKS_FOR_A_WORKSHEET = gql`
query GetAllTasksForAWorksheet($parent: ID) {
  myAssignments(parent: $parent) {
    edges {
      node {
        id
        endTime
        startTime
        task {
          name
          isMcq
          id
        }
      }
    }
  }
}
`; 