import { gql } from '@apollo/client';

export const CREATE_STUDY_SESSION = gql`
  mutation CreateStudySession($sessionId: String!) {
    createStudySession(input: {sessionId: $sessionId}) {
      studySession {
        sessionId
      }
    }
  }
`; 