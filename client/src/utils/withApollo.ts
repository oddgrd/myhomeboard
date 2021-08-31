import { withApollo } from 'next-apollo';
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { PaginatedProblems } from '../generated/graphql';
import { NextPageContext } from 'next';
import { createUploadLink } from 'apollo-upload-client';

// type bug: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/47369

const client = (ctx?: NextPageContext | undefined) => {
  const uploadLink = createUploadLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    headers: {
      cookie:
        (typeof window === 'undefined'
          ? ctx?.req?.headers.cookie
          : undefined) || ''
    }
  });

  return new ApolloClient({
    link: uploadLink as unknown as ApolloLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getProblems: {
              keyArgs: [],
              merge(
                existing: PaginatedProblems | undefined,
                incoming: PaginatedProblems
              ) {
                return {
                  ...incoming,
                  problems: [
                    ...(existing?.problems || []),
                    ...incoming.problems
                  ]
                };
              }
            }
          }
        }
      }
    })
  });
};

export default withApollo(client);
