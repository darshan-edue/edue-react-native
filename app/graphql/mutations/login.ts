import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($input: ObtainJSONWebTokenInput!) {
    tokenAuth(input: $input) {
      token
    }
  }
`; 