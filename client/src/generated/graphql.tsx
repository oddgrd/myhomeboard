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
  logout: Scalars['Boolean'];
  createProblem: Problem;
  addAscent?: Maybe<Problem>;
  deleteProblem: Scalars['Boolean'];
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
  grade: Array<Scalars['Int']>;
  rating?: Maybe<Array<Scalars['Int']>>;
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

export type CreateProblemMutationVariables = Exact<{
  createProblemOptions: CreateProblemInput;
}>;


export type CreateProblemMutation = { __typename?: 'Mutation', createProblem: { __typename?: 'Problem', id: string, creatorId: string, title: string, rules: string, grade: Array<number>, rating?: Maybe<Array<number>>, createdAt: string, updatedAt: string, coordinates: Array<{ __typename?: 'Coordinates', x: number, y: number, color: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type GetProblemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProblemsQuery = { __typename?: 'Query', getProblems?: Maybe<Array<{ __typename?: 'Problem', id: string, creatorId: string, title: string, rules: string, grade: Array<number>, rating?: Maybe<Array<number>>, createdAt: string, updatedAt: string, coordinates: Array<{ __typename?: 'Coordinates', x: number, y: number, color: string }> }>> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, name: string, email: string, avatar?: Maybe<string>, createdAt: string, updatedAt: string }> };


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
export const GetProblemsDocument = gql`
    query GetProblems {
  getProblems {
    id
    creatorId
    title
    rules
    grade
    rating
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