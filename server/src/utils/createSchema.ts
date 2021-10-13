import { AscentResolver } from '../resolvers/ascent';
import { BoardResolver } from '../resolvers/board';
import { LayoutResolver } from '../resolvers/layout';
import { ProblemResolver } from '../resolvers/problem';
import { UserResolver } from '../resolvers/user';
import { buildSchema } from 'type-graphql';

export const createSchema = () =>
  buildSchema({
    resolvers: [
      UserResolver,
      ProblemResolver,
      LayoutResolver,
      BoardResolver,
      AscentResolver
    ],
    validate: false
  });
