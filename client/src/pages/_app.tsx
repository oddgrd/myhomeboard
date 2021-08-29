import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

// type bug: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/47369
const client = new ApolloClient({
  link: uploadLink as unknown as ApolloLink,
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;
