import { gql } from '@apollo/client';

export const ASSIGNMENT_FIELDS = gql`
  fragment AssignmentFields on WorksheetAssignmentNode {
    id
    worksheet {
      id
      name
      description
    }
    dueDate
    active
    completed
  }
`; 