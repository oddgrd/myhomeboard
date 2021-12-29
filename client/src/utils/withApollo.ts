import { ApolloClient, ApolloLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { NextPageContext } from 'next';
import { withApollo } from 'next-apollo';
import { initCache } from './initCache';

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
        ssrMode: typeof window === 'undefined',
        cache: initCache()
        });
};
export default withApollo(client);
