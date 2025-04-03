/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment AssignmentFields on WorksheetAssignmentNode {\n    id\n    worksheet {\n      id\n      name\n      description\n    }\n    dueDate\n    active\n    completed\n  }\n": typeof types.AssignmentFieldsFragmentDoc,
    "\n  fragment TextMessageFields on TextMessageNode {\n    id\n    message\n    timestamp\n    byStudent\n    task {\n      id\n      assignment {\n        id\n      }\n    }\n  }\n": typeof types.TextMessageFieldsFragmentDoc,
    "\n  mutation CreateStudySession($sessionId: String!) {\n    createStudySession(input: {sessionId: $sessionId}) {\n      studySession {\n        sessionId\n      }\n    }\n  }\n": typeof types.CreateStudySessionDocument,
    "\n  mutation Login($input: ObtainJSONWebTokenInput!) {\n    tokenAuth(input: $input) {\n      token\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation RefreshToken($input: RefreshInput!) {\n    refreshToken(input: $input) {\n      token\n    }\n  }\n": typeof types.RefreshTokenDocument,
    "\nquery GetAllTasksForAWorksheet($parent: ID) {\n  myAssignments(parent: $parent) {\n    edges {\n      node {\n        id\n        endTime\n        startTime\n        task {\n          name\n          isMcq\n          id\n        }\n      }\n    }\n  }\n}\n": typeof types.GetAllTasksForAWorksheetDocument,
    "\nquery GetAllWorksheetAssignmentsForAStudent {\n  myAssignments(taskIsEmpty: true) {\n    edges {\n      node {\n        id\n        endTime\n        startTime\n        worksheet {\n          name\n          description\n          id\n        }\n      }\n    }\n  }\n}\n": typeof types.GetAllWorksheetAssignmentsForAStudentDocument,
    "\n  \n  query GetMyAssignments($startTime: DateTime) {\n    myAssignments(startTime: $startTime) {\n      edges {\n        node {\n          id\n          assignment {\n            ...AssignmentFields\n          }\n          worksheet {\n            id\n            name\n            description\n          }\n          task {\n            id\n            name\n            content\n            isMcq\n          }\n          startTime\n          endTime\n        }\n      }\n    }\n  }\n": typeof types.GetMyAssignmentsDocument,
    "\n  query GetWorksheets {\n    worksheets {\n      edges {\n        cursor\n        node {\n          id\n          name\n          description\n        }\n      }\n    }\n  }\n": typeof types.GetWorksheetsDocument,
};
const documents: Documents = {
    "\n  fragment AssignmentFields on WorksheetAssignmentNode {\n    id\n    worksheet {\n      id\n      name\n      description\n    }\n    dueDate\n    active\n    completed\n  }\n": types.AssignmentFieldsFragmentDoc,
    "\n  fragment TextMessageFields on TextMessageNode {\n    id\n    message\n    timestamp\n    byStudent\n    task {\n      id\n      assignment {\n        id\n      }\n    }\n  }\n": types.TextMessageFieldsFragmentDoc,
    "\n  mutation CreateStudySession($sessionId: String!) {\n    createStudySession(input: {sessionId: $sessionId}) {\n      studySession {\n        sessionId\n      }\n    }\n  }\n": types.CreateStudySessionDocument,
    "\n  mutation Login($input: ObtainJSONWebTokenInput!) {\n    tokenAuth(input: $input) {\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation RefreshToken($input: RefreshInput!) {\n    refreshToken(input: $input) {\n      token\n    }\n  }\n": types.RefreshTokenDocument,
    "\nquery GetAllTasksForAWorksheet($parent: ID) {\n  myAssignments(parent: $parent) {\n    edges {\n      node {\n        id\n        endTime\n        startTime\n        task {\n          name\n          isMcq\n          id\n        }\n      }\n    }\n  }\n}\n": types.GetAllTasksForAWorksheetDocument,
    "\nquery GetAllWorksheetAssignmentsForAStudent {\n  myAssignments(taskIsEmpty: true) {\n    edges {\n      node {\n        id\n        endTime\n        startTime\n        worksheet {\n          name\n          description\n          id\n        }\n      }\n    }\n  }\n}\n": types.GetAllWorksheetAssignmentsForAStudentDocument,
    "\n  \n  query GetMyAssignments($startTime: DateTime) {\n    myAssignments(startTime: $startTime) {\n      edges {\n        node {\n          id\n          assignment {\n            ...AssignmentFields\n          }\n          worksheet {\n            id\n            name\n            description\n          }\n          task {\n            id\n            name\n            content\n            isMcq\n          }\n          startTime\n          endTime\n        }\n      }\n    }\n  }\n": types.GetMyAssignmentsDocument,
    "\n  query GetWorksheets {\n    worksheets {\n      edges {\n        cursor\n        node {\n          id\n          name\n          description\n        }\n      }\n    }\n  }\n": types.GetWorksheetsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment AssignmentFields on WorksheetAssignmentNode {\n    id\n    worksheet {\n      id\n      name\n      description\n    }\n    dueDate\n    active\n    completed\n  }\n"): (typeof documents)["\n  fragment AssignmentFields on WorksheetAssignmentNode {\n    id\n    worksheet {\n      id\n      name\n      description\n    }\n    dueDate\n    active\n    completed\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment TextMessageFields on TextMessageNode {\n    id\n    message\n    timestamp\n    byStudent\n    task {\n      id\n      assignment {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment TextMessageFields on TextMessageNode {\n    id\n    message\n    timestamp\n    byStudent\n    task {\n      id\n      assignment {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateStudySession($sessionId: String!) {\n    createStudySession(input: {sessionId: $sessionId}) {\n      studySession {\n        sessionId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateStudySession($sessionId: String!) {\n    createStudySession(input: {sessionId: $sessionId}) {\n      studySession {\n        sessionId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($input: ObtainJSONWebTokenInput!) {\n    tokenAuth(input: $input) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: ObtainJSONWebTokenInput!) {\n    tokenAuth(input: $input) {\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RefreshToken($input: RefreshInput!) {\n    refreshToken(input: $input) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshToken($input: RefreshInput!) {\n    refreshToken(input: $input) {\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetAllTasksForAWorksheet($parent: ID) {\n  myAssignments(parent: $parent) {\n    edges {\n      node {\n        id\n        endTime\n        startTime\n        task {\n          name\n          isMcq\n          id\n        }\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery GetAllTasksForAWorksheet($parent: ID) {\n  myAssignments(parent: $parent) {\n    edges {\n      node {\n        id\n        endTime\n        startTime\n        task {\n          name\n          isMcq\n          id\n        }\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetAllWorksheetAssignmentsForAStudent {\n  myAssignments(taskIsEmpty: true) {\n    edges {\n      node {\n        id\n        endTime\n        startTime\n        worksheet {\n          name\n          description\n          id\n        }\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery GetAllWorksheetAssignmentsForAStudent {\n  myAssignments(taskIsEmpty: true) {\n    edges {\n      node {\n        id\n        endTime\n        startTime\n        worksheet {\n          name\n          description\n          id\n        }\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  query GetMyAssignments($startTime: DateTime) {\n    myAssignments(startTime: $startTime) {\n      edges {\n        node {\n          id\n          assignment {\n            ...AssignmentFields\n          }\n          worksheet {\n            id\n            name\n            description\n          }\n          task {\n            id\n            name\n            content\n            isMcq\n          }\n          startTime\n          endTime\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  \n  query GetMyAssignments($startTime: DateTime) {\n    myAssignments(startTime: $startTime) {\n      edges {\n        node {\n          id\n          assignment {\n            ...AssignmentFields\n          }\n          worksheet {\n            id\n            name\n            description\n          }\n          task {\n            id\n            name\n            content\n            isMcq\n          }\n          startTime\n          endTime\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetWorksheets {\n    worksheets {\n      edges {\n        cursor\n        node {\n          id\n          name\n          description\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetWorksheets {\n    worksheets {\n      edges {\n        cursor\n        node {\n          id\n          name\n          description\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;