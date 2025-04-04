import { gql } from '@apollo/client';

export const GET_ALL_WORKSHEET_ASSIGNMENTS_FOR_STUDENT = gql`
query GetAllWorksheetAssignmentsForAStudent {
  assignmentLogs(taskIsEmpty: true) {
    edges {
      node {
        id
        endTime
        startTime
        worksheet {
          name
          description
          id
        }
      }
    }
  }
}
`; 