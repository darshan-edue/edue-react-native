/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: { input: string; output: string; }
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: { input: string; output: string; }
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: { input: any; output: any; }
  /**
   * Allows use of a JSON String for input / output from the GraphQL schema.
   *
   * Use of this type is *not recommended* as you lose the benefits of having a defined, static
   * schema (one of the key benefits of GraphQL).
   */
  JSONString: { input: string; output: string; }
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: { input: any; output: any; }
};

export type AnswerLogNode = Node & {
  __typename?: 'AnswerLogNode';
  attemptlogSet: AttemptLogNodeConnection;
  content: CanvasStrokeNodeConnection;
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  mcqOptions: McqOptionsNodeConnection;
};


export type AnswerLogNodeAttemptlogSetArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type AnswerLogNodeContentArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type AnswerLogNodeMcqOptionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type AnswerNode = Node & {
  __typename?: 'AnswerNode';
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  mcqOptions: McqOptionsNodeConnection;
  task?: Maybe<TaskNode>;
  updatedAt: Scalars['DateTime']['output'];
};


export type AnswerNodeMcqOptionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type AnswerNodeConnection = {
  __typename?: 'AnswerNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<AnswerNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `AnswerNode` and its cursor. */
export type AnswerNodeEdge = {
  __typename?: 'AnswerNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<AnswerNode>;
};

export type AttemptLogNode = Node & {
  __typename?: 'AttemptLogNode';
  answer?: Maybe<AnswerLogNode>;
  assignment?: Maybe<WorksheetAssignmentNode>;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  isCorrect: Scalars['Boolean']['output'];
  remark?: Maybe<Scalars['String']['output']>;
  taskLog?: Maybe<CourseLogNode>;
};

export type AttemptLogNodeConnection = {
  __typename?: 'AttemptLogNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<AttemptLogNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `AttemptLogNode` and its cursor. */
export type AttemptLogNodeEdge = {
  __typename?: 'AttemptLogNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<AttemptLogNode>;
};

export type CanvasStrokeNode = Node & {
  __typename?: 'CanvasStrokeNode';
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  stroke?: Maybe<Scalars['String']['output']>;
  task?: Maybe<CourseLogNode>;
};

export type CanvasStrokeNodeConnection = {
  __typename?: 'CanvasStrokeNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<CanvasStrokeNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `CanvasStrokeNode` and its cursor. */
export type CanvasStrokeNodeEdge = {
  __typename?: 'CanvasStrokeNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<CanvasStrokeNode>;
};

export type ChatInterface = {
  byStudent?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  task?: Maybe<CourseLogNode>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
};

export type CheckAnswerMutation = {
  __typename?: 'CheckAnswerMutation';
  attemptLog?: Maybe<AttemptLogNode>;
};

/** An enumeration. */
export type CountryCodes =
  | 'INDIA';

export type CourseLogNode = Node & {
  __typename?: 'CourseLogNode';
  assignment?: Maybe<WorksheetAssignmentNode>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  startTime?: Maybe<Scalars['DateTime']['output']>;
  task?: Maybe<TaskNode>;
  worksheet?: Maybe<WorksheetNode>;
};

export type CourseLogNodeConnection = {
  __typename?: 'CourseLogNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<CourseLogNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `CourseLogNode` and its cursor. */
export type CourseLogNodeEdge = {
  __typename?: 'CourseLogNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<CourseLogNode>;
};

export type CourseNode = Node & {
  __typename?: 'CourseNode';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  instructor?: Maybe<UserType>;
  isApproved: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  state: CoursesCourseStateChoices;
  updatedAt: Scalars['DateTime']['output'];
};

export type CourseNodeConnection = {
  __typename?: 'CourseNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<CourseNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `CourseNode` and its cursor. */
export type CourseNodeEdge = {
  __typename?: 'CourseNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<CourseNode>;
};

/** An enumeration. */
export type CoursesCourseStateChoices =
  /** DRAFT */
  | 'DRAFT'
  /** LIVE */
  | 'LIVE'
  /** REMAKE */
  | 'REMAKE';

export type CreateAnswerInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  mcqOptionsAdd?: InputMaybe<Array<InputMaybe<CreateAnswerInputAddAnswerMcqoptions>>>;
  task: Scalars['ID']['input'];
};

export type CreateAnswerInputAddAnswerMcqoptions = {
  content: Scalars['String']['input'];
  task: Scalars['ID']['input'];
};

export type CreateAnswerLogInput = {
  attemptlogSet?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  content?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  mcqOptions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type CreateAnswerMutation = {
  __typename?: 'CreateAnswerMutation';
  answer?: Maybe<AnswerNode>;
};

export type CreateAttemptLogInput = {
  answer?: InputMaybe<CreateAnswerLogInput>;
  assignment: Scalars['ID']['input'];
  taskLog: Scalars['ID']['input'];
};

export type CreateCanvasStrokeInput = {
  stroke: Scalars['String']['input'];
  task: Scalars['ID']['input'];
};

export type CreateCanvasStrokeMutation = {
  __typename?: 'CreateCanvasStrokeMutation';
  canvasStroke?: Maybe<CanvasStrokeNode>;
};

export type CreateDumpLogInput = {
  action: StudentsDumpLogActionChoices;
  extraInfo?: InputMaybe<Scalars['JSONString']['input']>;
  object: Scalars['ID']['input'];
  session: Scalars['ID']['input'];
};

export type CreateDumpLogMutation = {
  __typename?: 'CreateDumpLogMutation';
  dumpLog?: Maybe<DumpLogNode>;
};

export type CreateMcqOptionsInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  task: Scalars['ID']['input'];
};

export type CreateMcqOptionsMutation = {
  __typename?: 'CreateMCQOptionsMutation';
  mcqOptions?: Maybe<McqOptionsNode>;
};

export type CreateStreamKeyInput = {
  sessionId: Scalars['String']['input'];
};

export type CreateStreamKeyMutation = {
  __typename?: 'CreateStreamKeyMutation';
  streamKey?: Maybe<StreamKeyNode>;
};

export type CreateStudySessionInput = {
  sessionId?: InputMaybe<Scalars['String']['input']>;
};

// export type CreateStudySessionMutation = {
//   __typename?: 'CreateStudySessionMutation';
//   studySession?: Maybe<StudySessionNode>;
// };

export type CreateTaskInput = {
  content: Scalars['String']['input'];
  isMcq?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  worksheetAdd?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type CreateTaskMutation = {
  __typename?: 'CreateTaskMutation';
  task?: Maybe<TaskNode>;
};

export type CreateTextMessageInput = {
  message: Scalars['String']['input'];
  task: Scalars['ID']['input'];
};

export type CreateTextMessageMutation = {
  __typename?: 'CreateTextMessageMutation';
  textMessage?: Maybe<TextMessageNode>;
};

export type CreateUserInput = {
  countryCode?: InputMaybe<UsersUserCountryCodeChoices>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type CreateWorksheetAssignmentInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  assignedTo: Scalars['ID']['input'];
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  dueDate: Scalars['Date']['input'];
  worksheet: Scalars['ID']['input'];
};

export type CreateWorksheetAssignmentMutation = {
  __typename?: 'CreateWorksheetAssignmentMutation';
  worksheetAssignment?: Maybe<WorksheetAssignmentNode>;
};

export type CreateWorksheetInput = {
  course: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateWorksheetMutation = {
  __typename?: 'CreateWorksheetMutation';
  worksheet?: Maybe<WorksheetNode>;
};

export type DeleteAnswerMutation = {
  __typename?: 'DeleteAnswerMutation';
  deletedId?: Maybe<Scalars['ID']['output']>;
  deletedInputId?: Maybe<Scalars['ID']['output']>;
  deletedRawId?: Maybe<Scalars['ID']['output']>;
  found?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteMcqOptionsMutation = {
  __typename?: 'DeleteMCQOptionsMutation';
  deletedId?: Maybe<Scalars['ID']['output']>;
  deletedInputId?: Maybe<Scalars['ID']['output']>;
  deletedRawId?: Maybe<Scalars['ID']['output']>;
  found?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteTaskMutation = {
  __typename?: 'DeleteTaskMutation';
  deletedId?: Maybe<Scalars['ID']['output']>;
  deletedInputId?: Maybe<Scalars['ID']['output']>;
  deletedRawId?: Maybe<Scalars['ID']['output']>;
  found?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteWorksheetAssignmentMutation = {
  __typename?: 'DeleteWorksheetAssignmentMutation';
  deletedId?: Maybe<Scalars['ID']['output']>;
  deletedInputId?: Maybe<Scalars['ID']['output']>;
  deletedRawId?: Maybe<Scalars['ID']['output']>;
  found?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteWorksheetMutation = {
  __typename?: 'DeleteWorksheetMutation';
  deletedId?: Maybe<Scalars['ID']['output']>;
  deletedInputId?: Maybe<Scalars['ID']['output']>;
  deletedRawId?: Maybe<Scalars['ID']['output']>;
  found?: Maybe<Scalars['Boolean']['output']>;
};

export type DumpLogNode = Node & {
  __typename?: 'DumpLogNode';
  action?: Maybe<StudentsDumpLogActionChoices>;
  extraInfo?: Maybe<Scalars['JSONString']['output']>;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  object?: Maybe<CourseLogNode>;
  session?: Maybe<StudySessionNode>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
};

export type DumpLogNodeConnection = {
  __typename?: 'DumpLogNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<DumpLogNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `DumpLogNode` and its cursor. */
export type DumpLogNodeEdge = {
  __typename?: 'DumpLogNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<DumpLogNode>;
};

export type EnrollmentNode = Node & {
  __typename?: 'EnrollmentNode';
  active: Scalars['Boolean']['output'];
  completed: Scalars['Boolean']['output'];
  course?: Maybe<CourseNode>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  startDate: Scalars['DateTime']['output'];
  user?: Maybe<UserType>;
};

export type EnrollmentNodeConnection = {
  __typename?: 'EnrollmentNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<EnrollmentNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `EnrollmentNode` and its cursor. */
export type EnrollmentNodeEdge = {
  __typename?: 'EnrollmentNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<EnrollmentNode>;
};

export type McqOptionsNode = Node & {
  __typename?: 'MCQOptionsNode';
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  task?: Maybe<TaskNode>;
  updatedAt: Scalars['DateTime']['output'];
};

export type McqOptionsNodeConnection = {
  __typename?: 'MCQOptionsNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<McqOptionsNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `MCQOptionsNode` and its cursor. */
export type McqOptionsNodeEdge = {
  __typename?: 'MCQOptionsNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<McqOptionsNode>;
};

export type Mutation = {
  __typename?: 'Mutation';
  checkStudentAnswer?: Maybe<CheckAnswerMutation>;
  createAnswer?: Maybe<CreateAnswerMutation>;
  createCanvasStroke?: Maybe<CreateCanvasStrokeMutation>;
  createDumplog?: Maybe<CreateDumpLogMutation>;
  createMcqOptions?: Maybe<CreateMcqOptionsMutation>;
  createStreamKey?: Maybe<CreateStreamKeyMutation>;
  createStudySession?: Maybe<CreateStudySessionMutation>;
  createTask?: Maybe<CreateTaskMutation>;
  createTextMessage?: Maybe<CreateTextMessageMutation>;
  createWorksheet?: Maybe<CreateWorksheetMutation>;
  createWorksheetAssignment?: Maybe<CreateWorksheetAssignmentMutation>;
  deleteAnswer?: Maybe<DeleteAnswerMutation>;
  deleteMcqOptions?: Maybe<DeleteMcqOptionsMutation>;
  deleteTask?: Maybe<DeleteTaskMutation>;
  deleteWorksheet?: Maybe<DeleteWorksheetMutation>;
  deleteWorksheetAssignment?: Maybe<DeleteWorksheetAssignmentMutation>;
  otpVerification?: Maybe<UserOtpVerification>;
  refreshToken?: Maybe<RefreshPayload>;
  registration?: Maybe<UserRegistartion>;
  removeCanvasStroke?: Maybe<RemoveCanvasStrokeMutation>;
  sendOtp?: Maybe<UserSendOtp>;
  /** Obtain JSON Web Token mutation */
  tokenAuth?: Maybe<ObtainJsonWebTokenPayload>;
  updateAnswer?: Maybe<UpdateAnswerMutation>;
  updateMcqOptions?: Maybe<UpdateMcqOptionsMutation>;
  updateTask?: Maybe<UpdateTaskMutation>;
  updateWorksheet?: Maybe<UpdateWorksheetMutation>;
  updateWorksheetAssignment?: Maybe<UpdateWorksheetAssignmentMutation>;
  uploadTaskMedia?: Maybe<TaskMediaUploadMutation>;
  verifyToken?: Maybe<VerifyPayload>;
};


export type MutationCheckStudentAnswerArgs = {
  input: CreateAttemptLogInput;
};


export type MutationCreateAnswerArgs = {
  input: CreateAnswerInput;
};


export type MutationCreateCanvasStrokeArgs = {
  input: CreateCanvasStrokeInput;
};


export type MutationCreateDumplogArgs = {
  input: CreateDumpLogInput;
};


export type MutationCreateMcqOptionsArgs = {
  input: CreateMcqOptionsInput;
};


export type MutationCreateStreamKeyArgs = {
  input: CreateStreamKeyInput;
};


export type MutationCreateStudySessionArgs = {
  input: CreateStudySessionInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationCreateTextMessageArgs = {
  input: CreateTextMessageInput;
};


export type MutationCreateWorksheetArgs = {
  input: CreateWorksheetInput;
};


export type MutationCreateWorksheetAssignmentArgs = {
  input: CreateWorksheetAssignmentInput;
};


export type MutationDeleteAnswerArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMcqOptionsArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteWorksheetArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteWorksheetAssignmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationOtpVerificationArgs = {
  verifyOtp: VerifyOtpInput;
};


export type MutationRefreshTokenArgs = {
  input: RefreshInput;
};


export type MutationRegistrationArgs = {
  input: CreateUserInput;
};


export type MutationRemoveCanvasStrokeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSendOtpArgs = {
  sendOtp: SendOtpInput;
};


export type MutationTokenAuthArgs = {
  input: ObtainJsonWebTokenInput;
};


export type MutationUpdateAnswerArgs = {
  id: Scalars['ID']['input'];
  input: UpdateAnswerInput;
};


export type MutationUpdateMcqOptionsArgs = {
  input: CreateMcqOptionsInput;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTaskInput;
};


export type MutationUpdateWorksheetArgs = {
  id: Scalars['ID']['input'];
  input: UpdateWorksheetInput;
};


export type MutationUpdateWorksheetAssignmentArgs = {
  id: Scalars['ID']['input'];
  input: UpdateWorksheetAssignmentInput;
};


export type MutationUploadTaskMediaArgs = {
  file: Scalars['Upload']['input'];
  taskId: Scalars['ID']['input'];
};


export type MutationVerifyTokenArgs = {
  input: VerifyInput;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object */
  id: Scalars['ID']['output'];
};

export type ObtainJsonWebTokenInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebTokenPayload = {
  __typename?: 'ObtainJSONWebTokenPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  payload: Scalars['GenericScalar']['output'];
  refreshExpiresIn: Scalars['Int']['output'];
  token: Scalars['String']['output'];
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  assignment?: Maybe<WorksheetAssignmentNode>;
  assignments?: Maybe<WorksheetAssignmentNodeConnection>;
  course?: Maybe<CourseNode>;
  courses?: Maybe<CourseNodeConnection>;
  currentTask?: Maybe<CourseLogNode>;
  enrollments?: Maybe<EnrollmentNodeConnection>;
  getLog?: Maybe<CourseLogNode>;
  me?: Maybe<UserType>;
  myAssignments?: Maybe<CourseLogNodeConnection>;
  taskAnswers?: Maybe<AnswerNodeConnection>;
  taskMcqoptions?: Maybe<McqOptionsNodeConnection>;
  taskStrokes?: Maybe<CanvasStrokeNodeConnection>;
  worksheet?: Maybe<WorksheetNode>;
  worksheets?: Maybe<WorksheetNodeConnection>;
};


export type QueryAssignmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAssignmentsArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  dueDate?: InputMaybe<Scalars['Date']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCourseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCoursesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isApproved?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCurrentTaskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEnrollmentsArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  course?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetLogArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMyAssignmentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  parent?: InputMaybe<Scalars['ID']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  taskIsEmpty?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryTaskAnswersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  task?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTaskMcqoptionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  task?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTaskStrokesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  task?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryWorksheetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryWorksheetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  course?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type RefreshInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

export type RefreshPayload = {
  __typename?: 'RefreshPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  payload: Scalars['GenericScalar']['output'];
  refreshExpiresIn: Scalars['Int']['output'];
  token: Scalars['String']['output'];
};

export type RemoveCanvasStrokeMutation = {
  __typename?: 'RemoveCanvasStrokeMutation';
  deletedId?: Maybe<Scalars['ID']['output']>;
  deletedInputId?: Maybe<Scalars['ID']['output']>;
  deletedRawId?: Maybe<Scalars['ID']['output']>;
  found?: Maybe<Scalars['Boolean']['output']>;
};

export type SendOtpInput = {
  countryCode?: InputMaybe<CountryCodes>;
  email?: InputMaybe<Scalars['String']['input']>;
  mode: VerificationModes;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type StreamKeyNode = Node & {
  __typename?: 'StreamKeyNode';
  generatedAt: Scalars['DateTime']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  sessionId: Scalars['String']['output'];
  streamKey: Scalars['String']['output'];
  streamName: Scalars['String']['output'];
};

/** An enumeration. */
export type StudentsDumpLogActionChoices =
  /** CheckAnswerCorrect */
  | 'CHECK_ANSWER_CORRECT'
  /** CheckAnswerIncorrect */
  | 'CHECK_ANSWER_INCORRECT'
  /** ClickTaskFromMenu */
  | 'CLICK_TASK_FROM_MENU'
  /** DeselectMCQOption */
  | 'DESELECT_MCQ_OPTION'
  /** EndSession */
  | 'END_SESSION'
  /** EndTask */
  | 'END_TASK'
  /** EndWorksheet */
  | 'END_WORKSHEET'
  /** EnrollmentEnd */
  | 'ENROLLMENT_END'
  /** EnrollmentStart */
  | 'ENROLLMENT_START'
  /** MLListening */
  | 'ML_LISTENING'
  /** MLResponding */
  | 'ML_RESPONDING'
  /** MLThinking */
  | 'ML_THINKING'
  /** SelectMCQOption */
  | 'SELECT_MCQ_OPTION'
  /** StartSession */
  | 'START_SESSION'
  /** StartTask */
  | 'START_TASK'
  /** StartWorksheet */
  | 'START_WORKSHEET'
  /** StrokeInputCreate */
  | 'STROKE_INPUT_CREATE'
  /** StrokeInputDelete */
  | 'STROKE_INPUT_DELETE'
  /** StudentStartedSpeaking */
  | 'STUDENT_STARTED_SPEAKING'
  /** StudentStoppedSpeaking */
  | 'STUDENT_STOPPED_SPEAKING'
  /** Unknown */
  | 'UNKNOWN'
  /** ViewTask */
  | 'VIEW_TASK'
  /** ViewTaskMenuClose */
  | 'VIEW_TASK_MENU_CLOSE'
  /** ViewTaskMenuOpen */
  | 'VIEW_TASK_MENU_OPEN';

export type StudySessionNode = Node & {
  __typename?: 'StudySessionNode';
  createdAt: Scalars['DateTime']['output'];
  dumplogs: DumpLogNodeConnection;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  sessionId?: Maybe<Scalars['String']['output']>;
};


export type StudySessionNodeDumplogsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type TaskMediaUploadMutation = {
  __typename?: 'TaskMediaUploadMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
  uploadedFileUrl?: Maybe<Scalars['String']['output']>;
};

export type TaskNode = Node & {
  __typename?: 'TaskNode';
  answers: AnswerNodeConnection;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  isMcq: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  options: McqOptionsNodeConnection;
  updatedAt: Scalars['DateTime']['output'];
};


export type TaskNodeAnswersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type TaskNodeOptionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type TaskNodeConnection = {
  __typename?: 'TaskNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TaskNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `TaskNode` and its cursor. */
export type TaskNodeEdge = {
  __typename?: 'TaskNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<TaskNode>;
};

export type TextMessageNode = ChatInterface & Node & {
  __typename?: 'TextMessageNode';
  byStudent?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  task?: Maybe<CourseLogNode>;
  textmessage?: Maybe<TextMessageNode>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
};

export type UpdateAnswerInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  mcqOptionsAdd?: InputMaybe<Array<InputMaybe<UpdateAnswerInputAddAnswerMcqoptions>>>;
  task?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateAnswerInputAddAnswerMcqoptions = {
  content: Scalars['String']['input'];
  task: Scalars['ID']['input'];
};

export type UpdateAnswerMutation = {
  __typename?: 'UpdateAnswerMutation';
  answer?: Maybe<AnswerNode>;
};

export type UpdateMcqOptionsMutation = {
  __typename?: 'UpdateMCQOptionsMutation';
  mcqOptions?: Maybe<McqOptionsNode>;
};

export type UpdateTaskInput = {
  answers?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  answersAdd?: InputMaybe<Array<InputMaybe<UpdateTaskInputAddTaskAnswers>>>;
  content?: InputMaybe<Scalars['String']['input']>;
  isMcq?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  options?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  optionsAdd?: InputMaybe<Array<InputMaybe<UpdateTaskInputAddTaskOptions>>>;
};

export type UpdateTaskInputAddTaskAnswers = {
  content?: InputMaybe<Scalars['String']['input']>;
  mcqOptions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UpdateTaskInputAddTaskOptions = {
  answer?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  content?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UpdateTaskMutation = {
  __typename?: 'UpdateTaskMutation';
  task?: Maybe<TaskNode>;
};

export type UpdateWorksheetAssignmentInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  assignedTo?: InputMaybe<Scalars['ID']['input']>;
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  dueDate?: InputMaybe<Scalars['Date']['input']>;
  worksheet?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateWorksheetAssignmentMutation = {
  __typename?: 'UpdateWorksheetAssignmentMutation';
  worksheetAssignment?: Maybe<WorksheetAssignmentNode>;
};

export type UpdateWorksheetInput = {
  course?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tasks?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  tasksUpdate?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UpdateWorksheetMutation = {
  __typename?: 'UpdateWorksheetMutation';
  worksheet?: Maybe<WorksheetNode>;
};

export type UserOtpVerification = {
  __typename?: 'UserOTPVerification';
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Boolean']['output']>;
};

export type UserRegistartion = {
  __typename?: 'UserRegistartion';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserType>;
};

export type UserSendOtp = {
  __typename?: 'UserSendOTP';
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Boolean']['output']>;
};

export type UserType = Node & {
  __typename?: 'UserType';
  countryCode?: Maybe<UsersUserCountryCodeChoices>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

/** An enumeration. */
export type UsersUserCountryCodeChoices =
  /** INDIA */
  | 'A_91';

/** An enumeration. */
export type VerificationModes =
  | 'EMAIL'
  | 'PHONE';

export type VerifyInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

export type VerifyOtpInput = {
  countryCode?: InputMaybe<CountryCodes>;
  email?: InputMaybe<Scalars['String']['input']>;
  mode: VerificationModes;
  otp: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type VerifyPayload = {
  __typename?: 'VerifyPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  payload: Scalars['GenericScalar']['output'];
};

export type WorksheetAssignmentNode = Node & {
  __typename?: 'WorksheetAssignmentNode';
  active: Scalars['Boolean']['output'];
  assignedTo?: Maybe<UserType>;
  completed: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  dueDate?: Maybe<Scalars['Date']['output']>;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  worksheet?: Maybe<WorksheetNode>;
};

export type WorksheetAssignmentNodeConnection = {
  __typename?: 'WorksheetAssignmentNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<WorksheetAssignmentNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `WorksheetAssignmentNode` and its cursor. */
export type WorksheetAssignmentNodeEdge = {
  __typename?: 'WorksheetAssignmentNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<WorksheetAssignmentNode>;
};

export type WorksheetNode = Node & {
  __typename?: 'WorksheetNode';
  course?: Maybe<CourseNode>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  tasks: TaskNodeConnection;
  updatedAt: Scalars['DateTime']['output'];
};


export type WorksheetNodeTasksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type WorksheetNodeConnection = {
  __typename?: 'WorksheetNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<WorksheetNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `WorksheetNode` and its cursor. */
export type WorksheetNodeEdge = {
  __typename?: 'WorksheetNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<WorksheetNode>;
};

export type AssignmentFieldsFragment = { __typename?: 'WorksheetAssignmentNode', id: string, dueDate?: string | null, active: boolean, completed: boolean, worksheet?: { __typename?: 'WorksheetNode', id: string, name?: string | null, description?: string | null } | null };

export type TextMessageFieldsFragment = { __typename?: 'TextMessageNode', id: string, message?: string | null, timestamp?: string | null, byStudent?: boolean | null, task?: { __typename?: 'CourseLogNode', id: string, assignment?: { __typename?: 'WorksheetAssignmentNode', id: string } | null } | null };

export type CreateStudySessionMutationVariables = Exact<{
  sessionId: Scalars['String']['input'];
}>;


export type CreateStudySessionMutation = { __typename?: 'Mutation', createStudySession?: { __typename?: 'CreateStudySessionMutation', studySession?: { __typename?: 'StudySessionNode', sessionId?: string | null } | null } | null };

export type LoginMutationVariables = Exact<{
  input: ObtainJsonWebTokenInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', tokenAuth?: { __typename?: 'ObtainJSONWebTokenPayload', token: string } | null };

export type RefreshTokenMutationVariables = Exact<{
  input: RefreshInput;
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken?: { __typename?: 'RefreshPayload', token: string } | null };

export type GetAllTasksForAWorksheetQueryVariables = Exact<{
  parent?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetAllTasksForAWorksheetQuery = { __typename?: 'Query', myAssignments?: { __typename?: 'CourseLogNodeConnection', edges: Array<{ __typename?: 'CourseLogNodeEdge', node?: { __typename?: 'CourseLogNode', id: string, endTime?: string | null, startTime?: string | null, task?: { __typename?: 'TaskNode', name: string, isMcq: boolean, id: string } | null } | null } | null> } | null };

export type GetAllWorksheetAssignmentsForAStudentQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllWorksheetAssignmentsForAStudentQuery = { __typename?: 'Query', myAssignments?: { __typename?: 'CourseLogNodeConnection', edges: Array<{ __typename?: 'CourseLogNodeEdge', node?: { __typename?: 'CourseLogNode', id: string, endTime?: string | null, startTime?: string | null, worksheet?: { __typename?: 'WorksheetNode', name?: string | null, description?: string | null, id: string } | null } | null } | null> } | null };

export type GetCurrentTaskQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCurrentTaskQuery = { __typename?: 'Query', currentTask?: { __typename?: 'CourseLogNode', task?: { __typename?: 'TaskNode', id: string, isMcq: boolean, name: string, content?: string | null } | null } | null };

export type GetMyAssignmentsQueryVariables = Exact<{
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type GetMyAssignmentsQuery = { __typename?: 'Query', myAssignments?: { __typename?: 'CourseLogNodeConnection', edges: Array<{ __typename?: 'CourseLogNodeEdge', node?: { __typename?: 'CourseLogNode', id: string, startTime?: string | null, endTime?: string | null, assignment?: { __typename?: 'WorksheetAssignmentNode', id: string, dueDate?: string | null, active: boolean, completed: boolean, worksheet?: { __typename?: 'WorksheetNode', id: string, name?: string | null, description?: string | null } | null } | null, worksheet?: { __typename?: 'WorksheetNode', id: string, name?: string | null, description?: string | null } | null, task?: { __typename?: 'TaskNode', id: string, name: string, content?: string | null, isMcq: boolean } | null } | null } | null> } | null };

export type GetWorksheetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorksheetsQuery = { __typename?: 'Query', worksheets?: { __typename?: 'WorksheetNodeConnection', edges: Array<{ __typename?: 'WorksheetNodeEdge', cursor: string, node?: { __typename?: 'WorksheetNode', id: string, name?: string | null, description?: string | null } | null } | null> } | null };

export const AssignmentFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssignmentFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorksheetAssignmentNode"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"worksheet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]} as unknown as DocumentNode<AssignmentFieldsFragment, unknown>;
export const TextMessageFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TextMessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessageNode"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"byStudent"}},{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<TextMessageFieldsFragment, unknown>;
export const CreateStudySessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStudySession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStudySession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studySession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sessionId"}}]}}]}}]}}]} as unknown as DocumentNode<CreateStudySessionMutation, CreateStudySessionMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ObtainJSONWebTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenAuth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const GetAllTasksForAWorksheetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTasksForAWorksheet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myAssignments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"parent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isMcq"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllTasksForAWorksheetQuery, GetAllTasksForAWorksheetQueryVariables>;
export const GetAllWorksheetAssignmentsForAStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllWorksheetAssignmentsForAStudent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myAssignments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskIsEmpty"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"worksheet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllWorksheetAssignmentsForAStudentQuery, GetAllWorksheetAssignmentsForAStudentQueryVariables>;
export const GetCurrentTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCurrentTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isMcq"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}}]} as unknown as DocumentNode<GetCurrentTaskQuery, GetCurrentTaskQueryVariables>;
export const GetMyAssignmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyAssignments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myAssignments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"startTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssignmentFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"worksheet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"isMcq"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssignmentFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorksheetAssignmentNode"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"worksheet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]} as unknown as DocumentNode<GetMyAssignmentsQuery, GetMyAssignmentsQueryVariables>;
export const GetWorksheetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWorksheets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"worksheets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetWorksheetsQuery, GetWorksheetsQueryVariables>;