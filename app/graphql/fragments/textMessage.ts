import { gql } from '@apollo/client';

export const TEXT_MESSAGE_FIELDS = gql`
  fragment TextMessageFields on TextMessageNode {
    id
    message
    timestamp
    byStudent
    task {
      id
      assignment {
        id
      }
    }
  }
`; 