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

export type Coordinates = {
  __typename?: 'Coordinates';
  x: Scalars['Int'];
  y: Scalars['Int'];
  color: Scalars['String'];
};

export type Coords = {
  x: Scalars['Int'];
  y: Scalars['Int'];
  color: Scalars['String'];
};

export type CreateProblemInput = {
  title: Scalars['String'];
  rules: Scalars['String'];
  grade: Scalars['Int'];
  coordinates: Coords;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  createProblem: Problem;
  deleteProblem: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationCreateProblemArgs = {
  options: CreateProblemInput;
};


export type MutationDeleteProblemArgs = {
  id: Scalars['Int'];
};

export type Problem = {
  __typename?: 'Problem';
  id: Scalars['Int'];
  creatorId: Scalars['Int'];
  title: Scalars['String'];
  rules: Scalars['String'];
  coordinates: Coordinates;
  grade: Array<Scalars['Int']>;
  rating?: Maybe<Array<Scalars['Int']>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  getUserById?: Maybe<User>;
  getUsers?: Maybe<Array<User>>;
  getProblems?: Maybe<Array<Problem>>;
  getProblem?: Maybe<Problem>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetProblemArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type GetProblemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProblemsQuery = { __typename?: 'Query', getProblems?: Maybe<Array<{ __typename?: 'Problem', id: number, creatorId: number, title: string, rules: string, grade: Array<number>, rating?: Maybe<Array<number>>, createdAt: string, updatedAt: string, coordinates: { __typename?: 'Coordinates', x: number, y: number, color: string } }>> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, avatar?: Maybe<string>, createdAt: string, updatedAt: string }> };


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
    username
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