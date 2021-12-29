import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import { InMemoryCache } from '@apollo/client';
import { PaginatedProblems } from '../generated/graphql';

export const initCache = () => {
  let cache = new InMemoryCache({
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
                problems: [...(existing?.problems || []), ...incoming.problems],
              };
            },
          },
        },
      },
    },
  });
  if (typeof window !== 'undefined') {
    persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
    }).then(() => {
      return cache;
    });
  }

  return cache;
};
