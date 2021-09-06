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
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
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
  title: Scalars['String'];
  rules: Scalars['String'];
  grade: Scalars['Int'];
  coordinates: Array<CoordinatesInput>;
};

export type Layout = {
  __typename?: 'Layout';
  id: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  url: Scalars['String'];
  creatorId: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createLayout: Layout;
  logout: Scalars['Boolean'];
  createProblem: Problem;
  updateProblem: Scalars['Boolean'];
  deleteProblem: Scalars['Boolean'];
  addAscent: Scalars['Boolean'];
  deleteAscent: Scalars['Boolean'];
};


export type MutationCreateLayoutArgs = {
  description: Scalars['String'];
  title: Scalars['String'];
  file: Scalars['Upload'];
};


export type MutationCreateProblemArgs = {
  options: CreateProblemInput;
};


export type MutationUpdateProblemArgs = {
  options: UpdateProblemInput;
};


export type MutationDeleteProblemArgs = {
  id: Scalars['String'];
};


export type MutationAddAscentArgs = {
  options: AddAscentInput;
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
  coordinates: Array<Coordinates>;
  grade: Scalars['Int'];
  rating?: Maybe<Scalars['Int']>;
  creator: User;
  ascents: Array<Ascent>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  consensusGrade?: Maybe<Scalars['Int']>;
  consensusRating?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  getUserById?: Maybe<User>;
  getUsers?: Maybe<Array<User>>;
  getProblems: PaginatedProblems;
  getProblem?: Maybe<Problem>;
  getAscents?: Maybe<Array<Ascent>>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetProblemsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryGetProblemArgs = {
  id: Scalars['String'];
};

export type UpdateProblemInput = {
  problemId: Scalars['String'];
  title: Scalars['String'];
  rules: Scalars['String'];
  grade: Scalars['Int'];
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

export type ProblemSnippetFragment = { __typename?: 'Problem', id: string, title: string, grade: number, consensusGrade?: Maybe<number>, consensusRating?: Maybe<number>, creatorId: string, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: string, name: string }, ascents: Array<{ __typename?: 'Ascent', grade: number, rating: number, userId: string }> };

export type AddAscentMutationVariables = Exact<{
  options: AddAscentInput;
}>;


export type AddAscentMutation = { __typename?: 'Mutation', addAscent: boolean };

export type CreateLayoutMutationVariables = Exact<{
  file: Scalars['Upload'];
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateLayoutMutation = { __typename?: 'Mutation', createLayout: { __typename?: 'Layout', title: string, description: string, url: string, creatorId: string } };

export type CreateProblemMutationVariables = Exact<{
  createProblemOptions: CreateProblemInput;
}>;


export type CreateProblemMutation = { __typename?: 'Mutation', createProblem: { __typename?: 'Problem', id: string, creatorId: string, title: string, rules: string, grade: number, rating?: Maybe<number>, createdAt: string, updatedAt: string, coordinates: Array<{ __typename?: 'Coordinates', x: number, y: number, color: string }> } };

export type DeleteAscentMutationVariables = Exact<{
  problemId: Scalars['String'];
}>;


export type DeleteAscentMutation = { __typename?: 'Mutation', deleteAscent: boolean };

export type DeleteProblemMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteProblemMutation = { __typename?: 'Mutation', deleteProblem: boolean };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateProblemMutationVariables = Exact<{
  options: UpdateProblemInput;
}>;


export type UpdateProblemMutation = { __typename?: 'Mutation', updateProblem: boolean };

export type GetProblemQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetProblemQuery = { __typename?: 'Query', getProblem?: Maybe<{ __typename?: 'Problem', id: string, title: string, grade: number, consensusGrade?: Maybe<number>, consensusRating?: Maybe<number>, rules: string, creatorId: string, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: string, name: string }, ascents: Array<{ __typename?: 'Ascent', userId: string, attempts: number, grade: number, rating: number, comment: string, createdAt: string, user: { __typename?: 'User', name: string, avatar?: Maybe<string> } }>, coordinates: Array<{ __typename?: 'Coordinates', x: number, y: number, color: string }> }> };

export type GetProblemsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetProblemsQuery = { __typename?: 'Query', getProblems: { __typename?: 'PaginatedProblems', hasMore: boolean, problems: Array<{ __typename?: 'Problem', id: string, title: string, grade: number, consensusGrade?: Maybe<number>, consensusRating?: Maybe<number>, creatorId: string, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: string, name: string }, ascents: Array<{ __typename?: 'Ascent', grade: number, rating: number, userId: string }> }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, name: string, email: string, avatar?: Maybe<string>, createdAt: string, updatedAt: string }> };

export const ProblemSnippetFragmentDoc = gql`
    fragment ProblemSnippet on Problem {
  id
  title
  grade
  consensusGrade
  consensusRating
  creatorId
  createdAt
  updatedAt
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
export const CreateLayoutDocument = gql`
    mutation CreateLayout($file: Upload!, $title: String!, $description: String!) {
  createLayout(file: $file, title: $title, description: $description) {
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
    mutation CreateProblem($createProblemOptions: CreateProblemInput!) {
  createProblem(options: $createProblemOptions) {
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
 *      createProblemOptions: // value for 'createProblemOptions'
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
export const UpdateProblemDocument = gql`
    mutation UpdateProblem($options: UpdateProblemInput!) {
  updateProblem(options: $options)
}
    `;
export type UpdateProblemMutationFn = Apollo.MutationFunction<UpdateProblemMutation, UpdateProblemMutationVariables>;

/**
 * __useUpdateProblemMutation__
 *
 * To run a mutation, you first call `useUpdateProblemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProblemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProblemMutation, { data, loading, error }] = useUpdateProblemMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUpdateProblemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProblemMutation, UpdateProblemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProblemMutation, UpdateProblemMutationVariables>(UpdateProblemDocument, options);
      }
export type UpdateProblemMutationHookResult = ReturnType<typeof useUpdateProblemMutation>;
export type UpdateProblemMutationResult = Apollo.MutationResult<UpdateProblemMutation>;
export type UpdateProblemMutationOptions = Apollo.BaseMutationOptions<UpdateProblemMutation, UpdateProblemMutationVariables>;
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
    query GetProblems($limit: Int!, $cursor: String) {
  getProblems(limit: $limit, cursor: $cursor) {
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