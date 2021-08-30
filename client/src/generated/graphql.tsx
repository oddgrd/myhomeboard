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
  comment?: Maybe<Scalars['String']>;
};

export type Ascent = {
  __typename?: 'Ascent';
  id: Scalars['String'];
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

export type BoardLayout = {
  __typename?: 'BoardLayout';
  id: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  url: Scalars['String'];
  creatorId: Scalars['String'];
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

export type Mutation = {
  __typename?: 'Mutation';
  createBoardLayout: BoardLayout;
  logout: Scalars['Boolean'];
  createProblem: Problem;
  addAscent?: Maybe<Problem>;
  deleteProblem: Scalars['Boolean'];
};


export type MutationCreateBoardLayoutArgs = {
  description: Scalars['String'];
  title: Scalars['String'];
  file: Scalars['Upload'];
};


export type MutationCreateProblemArgs = {
  options: CreateProblemInput;
};


export type MutationAddAscentArgs = {
  options: AddAscentInput;
};


export type MutationDeleteProblemArgs = {
  id: Scalars['String'];
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
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  getUserById?: Maybe<User>;
  getUsers?: Maybe<Array<User>>;
  getAscents?: Maybe<Array<Ascent>>;
  getProblems?: Maybe<Array<Problem>>;
  getProblem?: Maybe<Problem>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetProblemArgs = {
  id: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  googleId: Scalars['String'];
  problems: Array<Problem>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ProblemSnippetFragment = { __typename?: 'Problem', id: string, title: string, grade: number, rating?: Maybe<number>, creatorId: string, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: string, name: string } };

export type CreateBoardLayoutMutationVariables = Exact<{
  file: Scalars['Upload'];
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateBoardLayoutMutation = { __typename?: 'Mutation', createBoardLayout: { __typename?: 'BoardLayout', title: string, description: string, url: string, creatorId: string } };

export type CreateProblemMutationVariables = Exact<{
  createProblemOptions: CreateProblemInput;
}>;


export type CreateProblemMutation = { __typename?: 'Mutation', createProblem: { __typename?: 'Problem', id: string, creatorId: string, title: string, rules: string, grade: number, rating?: Maybe<number>, createdAt: string, updatedAt: string, coordinates: Array<{ __typename?: 'Coordinates', x: number, y: number, color: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type GetProblemQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetProblemQuery = { __typename?: 'Query', getProblem?: Maybe<{ __typename?: 'Problem', id: string, title: string, grade: number, rating?: Maybe<number>, rules: string, creatorId: string, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: string, name: string }, ascents: Array<{ __typename?: 'Ascent', userId: string, attempts: number, grade: number, rating: number, comment: string, createdAt: string, user: { __typename?: 'User', name: string, avatar?: Maybe<string> } }>, coordinates: Array<{ __typename?: 'Coordinates', x: number, y: number, color: string }> }> };

export type GetProblemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProblemsQuery = { __typename?: 'Query', getProblems?: Maybe<Array<{ __typename?: 'Problem', id: string, title: string, grade: number, rating?: Maybe<number>, creatorId: string, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: string, name: string } }>> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, name: string, email: string, avatar?: Maybe<string>, createdAt: string, updatedAt: string }> };

export const ProblemSnippetFragmentDoc = gql`
    fragment ProblemSnippet on Problem {
  id
  title
  grade
  rating
  creatorId
  createdAt
  updatedAt
  creator {
    id
    name
  }
}
    `;
export const CreateBoardLayoutDocument = gql`
    mutation CreateBoardLayout($file: Upload!, $title: String!, $description: String!) {
  createBoardLayout(file: $file, title: $title, description: $description) {
    title
    description
    url
    creatorId
  }
}
    `;
export type CreateBoardLayoutMutationFn = Apollo.MutationFunction<CreateBoardLayoutMutation, CreateBoardLayoutMutationVariables>;

/**
 * __useCreateBoardLayoutMutation__
 *
 * To run a mutation, you first call `useCreateBoardLayoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardLayoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardLayoutMutation, { data, loading, error }] = useCreateBoardLayoutMutation({
 *   variables: {
 *      file: // value for 'file'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateBoardLayoutMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardLayoutMutation, CreateBoardLayoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBoardLayoutMutation, CreateBoardLayoutMutationVariables>(CreateBoardLayoutDocument, options);
      }
export type CreateBoardLayoutMutationHookResult = ReturnType<typeof useCreateBoardLayoutMutation>;
export type CreateBoardLayoutMutationResult = Apollo.MutationResult<CreateBoardLayoutMutation>;
export type CreateBoardLayoutMutationOptions = Apollo.BaseMutationOptions<CreateBoardLayoutMutation, CreateBoardLayoutMutationVariables>;
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
export const GetProblemDocument = gql`
    query GetProblem($id: String!) {
  getProblem(id: $id) {
    id
    title
    grade
    rating
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
    query GetProblems {
  getProblems {
    ...ProblemSnippet
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
 *   },
 * });
 */
export function useGetProblemsQuery(baseOptions?: Apollo.QueryHookOptions<GetProblemsQuery, GetProblemsQueryVariables>) {
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