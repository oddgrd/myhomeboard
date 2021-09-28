import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AddAscentInput = {
  problemId: Scalars['String'];
  boardId: Scalars['String'];
  grade: Scalars['Int'];
  rating: Scalars['Int'];
  attempts: Scalars['Int'];
  comment: Scalars['String'];
};

export type Ascent = {
  __typename?: 'Ascent';
  userId: Scalars['String'];
  problemId: Scalars['String'];
  attempts: Scalars['Int'];
  grade: Scalars['Int'];
  rating: Scalars['Int'];
  comment: Scalars['String'];
  problem: Problem;
  user: User;
  boardId: Scalars['String'];
  board: Board;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Board = {
  __typename?: 'Board';
  id: Scalars['String'];
  title: Scalars['String'];
  creatorId: Scalars['String'];
  description: Scalars['String'];
  adjustable: Scalars['Boolean'];
  angles: Array<Scalars['Int']>;
  location?: Maybe<Scalars['String']>;
  creator: User;
  layouts?: Maybe<Array<Layout>>;
  problems?: Maybe<Array<Problem>>;
  ascents?: Maybe<Array<Ascent>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  currentLayout?: Maybe<Layout>;
};

export type BoardInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  adjustable: Scalars['Boolean'];
  angles: Array<Scalars['Int']>;
  location?: Maybe<Scalars['String']>;
};

export type Coordinates = {
  __typename?: 'Coordinates';
  x: Scalars['Int'];
  y: Scalars['Int'];
  color: Scalars['String'];
};

export type CoordinatesInput = {
  x: Scalars['Int'];
  y: Scalars['Int'];
  color: Scalars['String'];
};

export type CreateProblemInput = {
  boardId: Scalars['String'];
  layoutUrl: Scalars['String'];
  title: Scalars['String'];
  rules: Scalars['String'];
  grade: Scalars['Int'];
  angle: Scalars['Int'];
  coordinates: Array<CoordinatesInput>;
};

export type EditAscentInput = {
  problemId: Scalars['String'];
  grade: Scalars['Int'];
  rating: Scalars['Int'];
  attempts: Scalars['Int'];
  comment: Scalars['String'];
};

export type EditBoardInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  adjustable: Scalars['Boolean'];
  angles: Array<Scalars['Int']>;
  location?: Maybe<Scalars['String']>;
  boardId: Scalars['String'];
};

export type EditProblemInput = {
  problemId: Scalars['String'];
  title: Scalars['String'];
  rules: Scalars['String'];
  grade: Scalars['Int'];
  angle: Scalars['Int'];
};

export type Layout = {
  __typename?: 'Layout';
  id: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  url: Scalars['String'];
  creatorId: Scalars['String'];
  creator: User;
  boardId: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: Board;
  editBoard: Scalars['Boolean'];
  deleteBoard: Scalars['Boolean'];
  createLayout: Layout;
  createProblem: Problem;
  editProblem: Scalars['Boolean'];
  deleteProblem: Scalars['Boolean'];
  addAscent: Scalars['Boolean'];
  editAscent: Scalars['Boolean'];
  deleteAscent: Scalars['Boolean'];
  logout: Scalars['Boolean'];
};


export type MutationCreateBoardArgs = {
  options: BoardInput;
};


export type MutationEditBoardArgs = {
  options: EditBoardInput;
};


export type MutationDeleteBoardArgs = {
  boardId: Scalars['String'];
};


export type MutationCreateLayoutArgs = {
  description: Scalars['String'];
  boardId: Scalars['String'];
  title: Scalars['String'];
  file: Scalars['Upload'];
};


export type MutationCreateProblemArgs = {
  options: CreateProblemInput;
};


export type MutationEditProblemArgs = {
  options: EditProblemInput;
};


export type MutationDeleteProblemArgs = {
  id: Scalars['String'];
};


export type MutationAddAscentArgs = {
  options: AddAscentInput;
};


export type MutationEditAscentArgs = {
  options: EditAscentInput;
};


export type MutationDeleteAscentArgs = {
  problemId: Scalars['String'];
};

export type PaginatedProblems = {
  __typename?: 'PaginatedProblems';
  problems: Array<Problem>;
  hasMore: Scalars['Boolean'];
};

export type Problem = {
  __typename?: 'Problem';
  id: Scalars['String'];
  creatorId: Scalars['String'];
  title: Scalars['String'];
  rules: Scalars['String'];
  angle: Scalars['Int'];
  coordinates: Array<Coordinates>;
  grade: Scalars['Int'];
  rating?: Maybe<Scalars['Int']>;
  creator: User;
  boardId: Scalars['String'];
  board: Board;
  ascents: Array<Ascent>;
  layoutUrl: Scalars['String'];
  layout: Layout;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  consensusGrade?: Maybe<Scalars['Int']>;
  consensusRating?: Maybe<Scalars['Int']>;
  sendStatus?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  getBoard: Board;
  getBoards: Array<Board>;
  getLayouts: Array<Layout>;
  getProblems: PaginatedProblems;
  getProblem?: Maybe<Problem>;
  getAscents?: Maybe<Array<Ascent>>;
  me?: Maybe<User>;
  getUserById?: Maybe<User>;
  getUsers?: Maybe<Array<User>>;
};


export type QueryGetBoardArgs = {
  boardId: Scalars['String'];
};


export type QueryGetProblemsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  boardId: Scalars['String'];
};


export type QueryGetProblemArgs = {
  id: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  googleId: Scalars['String'];
  problems?: Maybe<Array<Problem>>;
  ascents?: Maybe<Array<Ascent>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type BoardCoreFragment = { __typename?: 'Board', id: string, creatorId: string, title: string, description: string, adjustable: boolean, angles: Array<number>, location?: Maybe<string>, currentLayout?: Maybe<{ __typename?: 'Layout', id: string, title: string, url: string, createdAt: string }> };

export type ProblemSnippetFragment = { __typename?: 'Problem', id: string, title: string, grade: number, angle: number, consensusGrade?: Maybe<number>, consensusRating?: Maybe<number>, creatorId: string, sendStatus?: Maybe<boolean>, createdAt: string, updatedAt: string, boardId: string, creator: { __typename?: 'User', id: string, name: string }, ascents: Array<{ __typename?: 'Ascent', grade: number, rating: number, userId: string }> };

export type AddAscentMutationVariables = Exact<{
  options: AddAscentInput;
}>;


export type AddAscentMutation = { __typename?: 'Mutation', addAscent: boolean };

export type CreateBoardMutationVariables = Exact<{
  options: BoardInput;
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard: { __typename?: 'Board', id: string, creatorId: string, title: string, description: string, adjustable: boolean, angles: Array<number>, location?: Maybe<string>, currentLayout?: Maybe<{ __typename?: 'Layout', id: string, title: string, url: string, createdAt: string }> } };

export type CreateLayoutMutationVariables = Exact<{
  file: Scalars['Upload'];
  title: Scalars['String'];
  description: Scalars['String'];
  boardId: Scalars['String'];
}>;


export type CreateLayoutMutation = { __typename?: 'Mutation', createLayout: { __typename?: 'Layout', boardId: string, title: string, description: string, url: string, creatorId: string } };

export type CreateProblemMutationVariables = Exact<{
  options: CreateProblemInput;
}>;


export type CreateProblemMutation = { __typename?: 'Mutation', createProblem: { __typename?: 'Problem', id: string, creatorId: string, title: string, rules: string, grade: number, rating?: Maybe<number>, createdAt: string, updatedAt: string, coordinates: Array<{ __typename?: 'Coordinates', x: number, y: number, color: string }> } };

export type DeleteAscentMutationVariables = Exact<{
  problemId: Scalars['String'];
}>;


export type DeleteAscentMutation = { __typename?: 'Mutation', deleteAscent: boolean };

export type DeleteBoardMutationVariables = Exact<{
  boardId: Scalars['String'];
}>;


export type DeleteBoardMutation = { __typename?: 'Mutation', deleteBoard: boolean };

export type DeleteProblemMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteProblemMutation = { __typename?: 'Mutation', deleteProblem: boolean };

export type EditAscentMutationVariables = Exact<{
  options: EditAscentInput;
}>;


export type EditAscentMutation = { __typename?: 'Mutation', editAscent: boolean };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type EditProblemMutationVariables = Exact<{
  options: EditProblemInput;
}>;


export type EditProblemMutation = { __typename?: 'Mutation', editProblem: boolean };

export type GetBoardQueryVariables = Exact<{
  boardId: Scalars['String'];
}>;


export type GetBoardQuery = { __typename?: 'Query', getBoard: { __typename?: 'Board', id: string, creatorId: string, title: string, description: string, adjustable: boolean, angles: Array<number>, location?: Maybe<string>, currentLayout?: Maybe<{ __typename?: 'Layout', id: string, title: string, url: string, createdAt: string }> } };

export type GetBoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBoardsQuery = { __typename?: 'Query', getBoards: Array<{ __typename?: 'Board', id: string, creatorId: string, title: string, description: string, adjustable: boolean, angles: Array<number>, location?: Maybe<string>, currentLayout?: Maybe<{ __typename?: 'Layout', id: string, title: string, url: string, createdAt: string }> }> };

export type GetProblemQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetProblemQuery = { __typename?: 'Query', getProblem?: Maybe<{ __typename?: 'Problem', id: string, title: string, grade: number, consensusGrade?: Maybe<number>, consensusRating?: Maybe<number>, rules: string, creatorId: string, sendStatus?: Maybe<boolean>, layoutUrl: string, boardId: string, angle: number, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: string, name: string }, ascents: Array<{ __typename?: 'Ascent', userId: string, attempts: number, grade: number, rating: number, comment: string, createdAt: string, boardId: string, user: { __typename?: 'User', name: string, avatar?: Maybe<string> } }>, coordinates: Array<{ __typename?: 'Coordinates', x: number, y: number, color: string }> }> };

export type GetProblemsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  boardId: Scalars['String'];
}>;


export type GetProblemsQuery = { __typename?: 'Query', getProblems: { __typename?: 'PaginatedProblems', hasMore: boolean, problems: Array<{ __typename?: 'Problem', id: string, title: string, grade: number, angle: number, consensusGrade?: Maybe<number>, consensusRating?: Maybe<number>, creatorId: string, sendStatus?: Maybe<boolean>, createdAt: string, updatedAt: string, boardId: string, creator: { __typename?: 'User', id: string, name: string }, ascents: Array<{ __typename?: 'Ascent', grade: number, rating: number, userId: string }> }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, name: string, email: string, avatar?: Maybe<string>, createdAt: string, updatedAt: string }> };

export const BoardCoreFragmentDoc = gql`
    fragment BoardCore on Board {
  id
  creatorId
  title
  description
  adjustable
  angles
  location
  currentLayout {
    id
    title
    url
    createdAt
  }
}
    `;
export const ProblemSnippetFragmentDoc = gql`
    fragment ProblemSnippet on Problem {
  id
  title
  grade
  angle
  consensusGrade
  consensusRating
  creatorId
  sendStatus
  createdAt
  updatedAt
  boardId
  creator {
    id
    name
  }
  ascents {
    grade
    rating
    userId
  }
}
    `;
export const AddAscentDocument = gql`
    mutation AddAscent($options: AddAscentInput!) {
  addAscent(options: $options)
}
    `;
export type AddAscentMutationFn = Apollo.MutationFunction<AddAscentMutation, AddAscentMutationVariables>;

/**
 * __useAddAscentMutation__
 *
 * To run a mutation, you first call `useAddAscentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAscentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAscentMutation, { data, loading, error }] = useAddAscentMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useAddAscentMutation(baseOptions?: Apollo.MutationHookOptions<AddAscentMutation, AddAscentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAscentMutation, AddAscentMutationVariables>(AddAscentDocument, options);
      }
export type AddAscentMutationHookResult = ReturnType<typeof useAddAscentMutation>;
export type AddAscentMutationResult = Apollo.MutationResult<AddAscentMutation>;
export type AddAscentMutationOptions = Apollo.BaseMutationOptions<AddAscentMutation, AddAscentMutationVariables>;
export const CreateBoardDocument = gql`
    mutation CreateBoard($options: BoardInput!) {
  createBoard(options: $options) {
    ...BoardCore
  }
}
    ${BoardCoreFragmentDoc}`;
export type CreateBoardMutationFn = Apollo.MutationFunction<CreateBoardMutation, CreateBoardMutationVariables>;

/**
 * __useCreateBoardMutation__
 *
 * To run a mutation, you first call `useCreateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardMutation, { data, loading, error }] = useCreateBoardMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateBoardMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardMutation, CreateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, options);
      }
export type CreateBoardMutationHookResult = ReturnType<typeof useCreateBoardMutation>;
export type CreateBoardMutationResult = Apollo.MutationResult<CreateBoardMutation>;
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<CreateBoardMutation, CreateBoardMutationVariables>;
export const CreateLayoutDocument = gql`
    mutation CreateLayout($file: Upload!, $title: String!, $description: String!, $boardId: String!) {
  createLayout(
    file: $file
    title: $title
    description: $description
    boardId: $boardId
  ) {
    boardId
    title
    description
    url
    creatorId
  }
}
    `;
export type CreateLayoutMutationFn = Apollo.MutationFunction<CreateLayoutMutation, CreateLayoutMutationVariables>;

/**
 * __useCreateLayoutMutation__
 *
 * To run a mutation, you first call `useCreateLayoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLayoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLayoutMutation, { data, loading, error }] = useCreateLayoutMutation({
 *   variables: {
 *      file: // value for 'file'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useCreateLayoutMutation(baseOptions?: Apollo.MutationHookOptions<CreateLayoutMutation, CreateLayoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLayoutMutation, CreateLayoutMutationVariables>(CreateLayoutDocument, options);
      }
export type CreateLayoutMutationHookResult = ReturnType<typeof useCreateLayoutMutation>;
export type CreateLayoutMutationResult = Apollo.MutationResult<CreateLayoutMutation>;
export type CreateLayoutMutationOptions = Apollo.BaseMutationOptions<CreateLayoutMutation, CreateLayoutMutationVariables>;
export const CreateProblemDocument = gql`
    mutation CreateProblem($options: CreateProblemInput!) {
  createProblem(options: $options) {
    id
    creatorId
    title
    rules
    grade
    rating
    createdAt
    updatedAt
    coordinates {
      x
      y
      color
    }
  }
}
    `;
export type CreateProblemMutationFn = Apollo.MutationFunction<CreateProblemMutation, CreateProblemMutationVariables>;

/**
 * __useCreateProblemMutation__
 *
 * To run a mutation, you first call `useCreateProblemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProblemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProblemMutation, { data, loading, error }] = useCreateProblemMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateProblemMutation(baseOptions?: Apollo.MutationHookOptions<CreateProblemMutation, CreateProblemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProblemMutation, CreateProblemMutationVariables>(CreateProblemDocument, options);
      }
export type CreateProblemMutationHookResult = ReturnType<typeof useCreateProblemMutation>;
export type CreateProblemMutationResult = Apollo.MutationResult<CreateProblemMutation>;
export type CreateProblemMutationOptions = Apollo.BaseMutationOptions<CreateProblemMutation, CreateProblemMutationVariables>;
export const DeleteAscentDocument = gql`
    mutation DeleteAscent($problemId: String!) {
  deleteAscent(problemId: $problemId)
}
    `;
export type DeleteAscentMutationFn = Apollo.MutationFunction<DeleteAscentMutation, DeleteAscentMutationVariables>;

/**
 * __useDeleteAscentMutation__
 *
 * To run a mutation, you first call `useDeleteAscentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAscentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAscentMutation, { data, loading, error }] = useDeleteAscentMutation({
 *   variables: {
 *      problemId: // value for 'problemId'
 *   },
 * });
 */
export function useDeleteAscentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAscentMutation, DeleteAscentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAscentMutation, DeleteAscentMutationVariables>(DeleteAscentDocument, options);
      }
export type DeleteAscentMutationHookResult = ReturnType<typeof useDeleteAscentMutation>;
export type DeleteAscentMutationResult = Apollo.MutationResult<DeleteAscentMutation>;
export type DeleteAscentMutationOptions = Apollo.BaseMutationOptions<DeleteAscentMutation, DeleteAscentMutationVariables>;
export const DeleteBoardDocument = gql`
    mutation DeleteBoard($boardId: String!) {
  deleteBoard(boardId: $boardId)
}
    `;
export type DeleteBoardMutationFn = Apollo.MutationFunction<DeleteBoardMutation, DeleteBoardMutationVariables>;

/**
 * __useDeleteBoardMutation__
 *
 * To run a mutation, you first call `useDeleteBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBoardMutation, { data, loading, error }] = useDeleteBoardMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useDeleteBoardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBoardMutation, DeleteBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(DeleteBoardDocument, options);
      }
export type DeleteBoardMutationHookResult = ReturnType<typeof useDeleteBoardMutation>;
export type DeleteBoardMutationResult = Apollo.MutationResult<DeleteBoardMutation>;
export type DeleteBoardMutationOptions = Apollo.BaseMutationOptions<DeleteBoardMutation, DeleteBoardMutationVariables>;
export const DeleteProblemDocument = gql`
    mutation DeleteProblem($id: String!) {
  deleteProblem(id: $id)
}
    `;
export type DeleteProblemMutationFn = Apollo.MutationFunction<DeleteProblemMutation, DeleteProblemMutationVariables>;

/**
 * __useDeleteProblemMutation__
 *
 * To run a mutation, you first call `useDeleteProblemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProblemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProblemMutation, { data, loading, error }] = useDeleteProblemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProblemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProblemMutation, DeleteProblemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProblemMutation, DeleteProblemMutationVariables>(DeleteProblemDocument, options);
      }
export type DeleteProblemMutationHookResult = ReturnType<typeof useDeleteProblemMutation>;
export type DeleteProblemMutationResult = Apollo.MutationResult<DeleteProblemMutation>;
export type DeleteProblemMutationOptions = Apollo.BaseMutationOptions<DeleteProblemMutation, DeleteProblemMutationVariables>;
export const EditAscentDocument = gql`
    mutation EditAscent($options: EditAscentInput!) {
  editAscent(options: $options)
}
    `;
export type EditAscentMutationFn = Apollo.MutationFunction<EditAscentMutation, EditAscentMutationVariables>;

/**
 * __useEditAscentMutation__
 *
 * To run a mutation, you first call `useEditAscentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAscentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAscentMutation, { data, loading, error }] = useEditAscentMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useEditAscentMutation(baseOptions?: Apollo.MutationHookOptions<EditAscentMutation, EditAscentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditAscentMutation, EditAscentMutationVariables>(EditAscentDocument, options);
      }
export type EditAscentMutationHookResult = ReturnType<typeof useEditAscentMutation>;
export type EditAscentMutationResult = Apollo.MutationResult<EditAscentMutation>;
export type EditAscentMutationOptions = Apollo.BaseMutationOptions<EditAscentMutation, EditAscentMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const EditProblemDocument = gql`
    mutation EditProblem($options: EditProblemInput!) {
  editProblem(options: $options)
}
    `;
export type EditProblemMutationFn = Apollo.MutationFunction<EditProblemMutation, EditProblemMutationVariables>;

/**
 * __useEditProblemMutation__
 *
 * To run a mutation, you first call `useEditProblemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProblemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProblemMutation, { data, loading, error }] = useEditProblemMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useEditProblemMutation(baseOptions?: Apollo.MutationHookOptions<EditProblemMutation, EditProblemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProblemMutation, EditProblemMutationVariables>(EditProblemDocument, options);
      }
export type EditProblemMutationHookResult = ReturnType<typeof useEditProblemMutation>;
export type EditProblemMutationResult = Apollo.MutationResult<EditProblemMutation>;
export type EditProblemMutationOptions = Apollo.BaseMutationOptions<EditProblemMutation, EditProblemMutationVariables>;
export const GetBoardDocument = gql`
    query getBoard($boardId: String!) {
  getBoard(boardId: $boardId) {
    ...BoardCore
  }
}
    ${BoardCoreFragmentDoc}`;

/**
 * __useGetBoardQuery__
 *
 * To run a query within a React component, call `useGetBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardQuery({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useGetBoardQuery(baseOptions: Apollo.QueryHookOptions<GetBoardQuery, GetBoardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardQuery, GetBoardQueryVariables>(GetBoardDocument, options);
      }
export function useGetBoardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardQuery, GetBoardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardQuery, GetBoardQueryVariables>(GetBoardDocument, options);
        }
export type GetBoardQueryHookResult = ReturnType<typeof useGetBoardQuery>;
export type GetBoardLazyQueryHookResult = ReturnType<typeof useGetBoardLazyQuery>;
export type GetBoardQueryResult = Apollo.QueryResult<GetBoardQuery, GetBoardQueryVariables>;
export const GetBoardsDocument = gql`
    query getBoards {
  getBoards {
    ...BoardCore
  }
}
    ${BoardCoreFragmentDoc}`;

/**
 * __useGetBoardsQuery__
 *
 * To run a query within a React component, call `useGetBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBoardsQuery(baseOptions?: Apollo.QueryHookOptions<GetBoardsQuery, GetBoardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardsQuery, GetBoardsQueryVariables>(GetBoardsDocument, options);
      }
export function useGetBoardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardsQuery, GetBoardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardsQuery, GetBoardsQueryVariables>(GetBoardsDocument, options);
        }
export type GetBoardsQueryHookResult = ReturnType<typeof useGetBoardsQuery>;
export type GetBoardsLazyQueryHookResult = ReturnType<typeof useGetBoardsLazyQuery>;
export type GetBoardsQueryResult = Apollo.QueryResult<GetBoardsQuery, GetBoardsQueryVariables>;
export const GetProblemDocument = gql`
    query GetProblem($id: String!) {
  getProblem(id: $id) {
    id
    title
    grade
    consensusGrade
    consensusRating
    rules
    creatorId
    sendStatus
    layoutUrl
    boardId
    angle
    creator {
      id
      name
    }
    ascents {
      userId
      attempts
      grade
      rating
      comment
      createdAt
      boardId
      user {
        name
        avatar
      }
    }
    coordinates {
      x
      y
      color
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetProblemQuery__
 *
 * To run a query within a React component, call `useGetProblemQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProblemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProblemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProblemQuery(baseOptions: Apollo.QueryHookOptions<GetProblemQuery, GetProblemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProblemQuery, GetProblemQueryVariables>(GetProblemDocument, options);
      }
export function useGetProblemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProblemQuery, GetProblemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProblemQuery, GetProblemQueryVariables>(GetProblemDocument, options);
        }
export type GetProblemQueryHookResult = ReturnType<typeof useGetProblemQuery>;
export type GetProblemLazyQueryHookResult = ReturnType<typeof useGetProblemLazyQuery>;
export type GetProblemQueryResult = Apollo.QueryResult<GetProblemQuery, GetProblemQueryVariables>;
export const GetProblemsDocument = gql`
    query GetProblems($limit: Int!, $cursor: String, $boardId: String!) {
  getProblems(limit: $limit, cursor: $cursor, boardId: $boardId) {
    hasMore
    problems {
      ...ProblemSnippet
    }
  }
}
    ${ProblemSnippetFragmentDoc}`;

/**
 * __useGetProblemsQuery__
 *
 * To run a query within a React component, call `useGetProblemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProblemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProblemsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useGetProblemsQuery(baseOptions: Apollo.QueryHookOptions<GetProblemsQuery, GetProblemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProblemsQuery, GetProblemsQueryVariables>(GetProblemsDocument, options);
      }
export function useGetProblemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProblemsQuery, GetProblemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProblemsQuery, GetProblemsQueryVariables>(GetProblemsDocument, options);
        }
export type GetProblemsQueryHookResult = ReturnType<typeof useGetProblemsQuery>;
export type GetProblemsLazyQueryHookResult = ReturnType<typeof useGetProblemsLazyQuery>;
export type GetProblemsQueryResult = Apollo.QueryResult<GetProblemsQuery, GetProblemsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    email
    avatar
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;