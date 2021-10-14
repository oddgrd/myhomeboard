import { graphql, GraphQLSchema } from 'graphql';
import { Maybe } from 'type-graphql';
import { createSchema } from '../utils/createSchema';

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  userId?: string;
}

let schema: GraphQLSchema;

export const gqlWrapper = async ({
  source,
  variableValues,
  userId,
}: Options) => {
  // Cache schema
  if (!schema) {
    schema = await createSchema();
  }

  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          passport: {
            user: userId,
          },
        },
      },
      res: {
        clearCookie: jest.fn().mockReturnThis(),
      },
    },
  });
};
