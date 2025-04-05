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
    "\n  mutation CreateStudySession($sessionId: String!) {\n    createStudySession(input: {sessionId: $sessionId}) {\n      studySession {\n        sessionId\n      }\n    }\n  }\n": typeof types.CreateStudySessionDocument,
    "\n  mutation Login($input: ObtainJSONWebTokenInput!) {\n    tokenAuth(input: $input) {\n      token\n      refreshToken\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation RefreshToken($input: RefreshInput!) {\n    refreshToken(input: $input) {\n      token\n      refreshToken\n    }\n  }\n": typeof types.RefreshTokenDocument,
    "\nquery GetAllTasksForAWorksheet($parent: ID) {\n  assignmentLogs(parent: $parent) {\n    edges {\n      node {\n        id\n        endTime\n        startTime\n        task {\n          name\n          isMcq\n          id\n        }\n      }\n    }\n  }\n}\n": typeof types.GetAllTasksForAWorksheetDocument,
    "\nquery GetAllWorksheetAssignmentsForAStudent {\n  assignmentLogs(taskIsEmpty: true) {\n    edges {\n      node {\n        id\n        endTime\n        startTime\n        worksheet {\n          name\n          description\n          id\n        }\n      }\n    }\n  }\n}\n": typeof types.GetAllWorksheetAssignmentsForAStudentDocument,
    "\n  query getCurrentTask($id: ID!) {\n    assignmentLog(id: $id) {\n      task {\n        id\n        isMcq\n        name\n        content\n      }\n    }\n  }\n": typeof types.GetCurrentTaskDocument,
    "\n  \n  query GetMyAssignments($startTime: DateTime) {\n    assignmentLogs(startTime: $startTime) {\n      edges {\n        node {\n          id\n          assignment {\n            ...AssignmentFields\n          }\n          worksheet {\n            id\n            name\n            description\n          }\n          task {\n            id\n            name\n            content\n            isMcq\n          }\n          startTime\n          endTime\n        }\n      }\n    }\n  }\n": typeof types.GetMyAssignmentsDocument,
    "\nquery GetATaskUsingID($id: ID!) {\n  assignmentLog(id: $id) {\n    task {\n      content\n      name\n      isMcq\n    }\n    id\n  }\n}\n": typeof types.GetATaskUsingIdDocument,
};
const documents: Documents = {
    "\n  fragment AssignmentFields on WorksheetAssignmentNode {\n    id\n    worksheet {\n      id\n      name\n      description\n    }\n    dueDate\n    active\n    completed\n  }\n": types.AssignmentFieldsFragmentDoc,
    "\n  mutation CreateStudySession($sessionId: String!) {\n    createStudySession(input: {sessionId: $sessionId}) {\n      studySession {\n        sessionId\n      }\n    }\n  }\n": types.CreateStudySessionDocument,
    "\n  mutation Login($input: ObtainJSONWebTokenInput!) {\n    tokenAuth(input: $input) {\n      token\n      refreshToken\n    }\n  }\n": types.LoginDocument,
    "\n  mutation RefreshToken($input: RefreshInput!) {\n    refreshToken(input: $input) {\n      token\n      refreshToken\n    }\n  }\n": types.RefreshTokenDocument,
    "\nquery GetAllTasksForAWorksheet($parent: ID) {\n  assignmentLogs(parent: $parent) {\n    edges {\n      node {\n        id\n        endTime\n        startTime\n        task {\n          name\n          isMcq\n          id\n        }\n      }\n    }\n  }\n}\n": types.GetAllTasksForAWorksheetDocument,
    "\nquery GetAllWorksheetAssignmentsForAStudent {\n  assignmentLogs(taskIsEmpty: true) {\n    edges {\n      node {\n        id\n        endTime\n        startTime\n        worksheet {\n          name\n          description\n          id\n        }\n      }\n    }\n  }\n}\n": types.GetAllWorksheetAssignmentsForAStudentDocument,
    "\n  query getCurrentTask($id: ID!) {\n    assignmentLog(id: $id) {\n      task {\n        id\n        isMcq\n        name\n        content\n      }\n    }\n  }\n": types.GetCurrentTaskDocument,
    "\n  \n  query GetMyAssignments($startTime: DateTime) {\n    assignmentLogs(startTime: $startTime) {\n      edges {\n        node {\n          id\n          assignment {\n            ...AssignmentFields\n          }\n          worksheet {\n            id\n            name\n            description\n          }\n          task {\n            id\n            name\n            content\n            isMcq\n          }\n          startTime\n          endTime\n        }\n      }\n    }\n  }\n": types.GetMyAssignmentsDocument,
    "\nquery GetATaskUsingID($id: ID!) {\n  assignmentLog(id: $id) {\n    task {\n      content\n      name\n      isMcq\n    }\n    id\n  }\n}\n": types.GetATaskUsingIdDocument,
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
export function gql(source: "\n  mutation CreateStudySession($sessionId: String!) {\n    createStudySession(input: {sessionId: $sessionId}) {\n      studySession {\n        sessionId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateStudySession($sessionId: String!) {\n    createStudySession(input: {sessionId: $sessionId}) {\n      studySession {\n        sessionId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($input: ObtainJSONWebTokenInput!) {\n    tokenAuth(input: $input) {\n      token\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: ObtainJSONWebTokenInput!) {\n    tokenAuth(input: $input) {\n      token\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RefreshToken($input: RefreshInput!) {\n    refreshToken(input: $input) {\n      token\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshToken($input: RefreshInput!) {\n    refreshToken(input: $input) {\n      token\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetAllTasksForAWorksheet($parent: ID) {\n  assignmentLogs(parent: $parent) {\n    edges {\n      node {\n        id\n        endTime\n        startTime\n        task {\n          name\n          isMcq\n          id\n        }\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery GetAllTasksForAWorksheet($parent: ID) {\n  assignmentLogs(parent: $parent) {\n    edges {\n      node {\n        id\n        endTime\n        startTime\n        task {\n          name\n          isMcq\n          id\n        }\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetAllWorksheetAssignmentsForAStudent {\n  assignmentLogs(taskIsEmpty: true) {\n    edges {\n      node {\n        id\n        endTime\n        startTime\n        worksheet {\n          name\n          description\n          id\n        }\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery GetAllWorksheetAssignmentsForAStudent {\n  assignmentLogs(taskIsEmpty: true) {\n    edges {\n      node {\n        id\n        endTime\n        startTime\n        worksheet {\n          name\n          description\n          id\n        }\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getCurrentTask($id: ID!) {\n    assignmentLog(id: $id) {\n      task {\n        id\n        isMcq\n        name\n        content\n      }\n    }\n  }\n"): (typeof documents)["\n  query getCurrentTask($id: ID!) {\n    assignmentLog(id: $id) {\n      task {\n        id\n        isMcq\n        name\n        content\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  query GetMyAssignments($startTime: DateTime) {\n    assignmentLogs(startTime: $startTime) {\n      edges {\n        node {\n          id\n          assignment {\n            ...AssignmentFields\n          }\n          worksheet {\n            id\n            name\n            description\n          }\n          task {\n            id\n            name\n            content\n            isMcq\n          }\n          startTime\n          endTime\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  \n  query GetMyAssignments($startTime: DateTime) {\n    assignmentLogs(startTime: $startTime) {\n      edges {\n        node {\n          id\n          assignment {\n            ...AssignmentFields\n          }\n          worksheet {\n            id\n            name\n            description\n          }\n          task {\n            id\n            name\n            content\n            isMcq\n          }\n          startTime\n          endTime\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetATaskUsingID($id: ID!) {\n  assignmentLog(id: $id) {\n    task {\n      content\n      name\n      isMcq\n    }\n    id\n  }\n}\n"): (typeof documents)["\nquery GetATaskUsingID($id: ID!) {\n  assignmentLog(id: $id) {\n    task {\n      content\n      name\n      isMcq\n    }\n    id\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;