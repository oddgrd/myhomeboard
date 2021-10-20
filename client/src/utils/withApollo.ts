import { withApollo } from 'next-apollo';
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { PaginatedProblems } from '../generated/graphql';
import { NextPageContext } from 'next';
import { createUploadLink } from 'apollo-upload-client';

const client = (ctx?: NextPageContext | undefined) => {
  const apiUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_URL
      : 'http://localhost:4000/graphql';

  const uploadLink = createUploadLink({
    uri: apiUrl,
    credentials: 'include',
    headers: {
      cookie:
        (typeof window === 'undefined'
          ? ctx?.req?.headers.cookie
          : undefined) || '',
    },
  });

  return new ApolloClient({
    // type bug: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/47369
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
                    ...incoming.problems,
                  ],
                };
              },
            },
          },
        },
      },
    }),
  });
};
export default withApollo(client);
