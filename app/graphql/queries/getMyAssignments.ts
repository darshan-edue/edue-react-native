import { gql } from '@apollo/client';
import { ASSIGNMENT_FIELDS } from '../fragments/assignment';

export const GET_MY_ASSIGNMENTS = gql`
  ${ASSIGNMENT_FIELDS}
  query GetMyAssignments($startTime: DateTime) {
    assignmentLogs(startTime: $startTime) {
      edges {
        node {
          id
          assignment {
            ...AssignmentFields
          }
          worksheet {
            id
            name
            description
          }
          task {
            id
            name
            content
            isMcq
          }
          startTime
          endTime
        }
      }
    }
  }
`; 