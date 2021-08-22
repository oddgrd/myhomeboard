import 'reflect-metadata';
import 'dotenv-safe/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { TestResolver } from './resolvers/testResolver';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { Board } from './entities/Board';
import { Problem } from './entities/Problem';
import { User } from './entities/User';
import path from 'path';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { UserResolver } from './resolvers/userResolver';
import { ProblemResolver } from './resolvers/problemResolver';

const main = async () => {
  const connection = await createConnection({
    applicationName: 'myhomeboard',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [User, Problem, Board],
    migrations: [path.join(__dirname, './migrations/*')],
    logging: true,
    synchronize: true
  });
  const app = express();

  const devWhitelist = [
    'https://studio.apollographql.com',
    'http://localhost:3000'
  ];
  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || devWhitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true
    })
  );

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TestResolver, UserResolver, ProblemResolver],
      validate: false
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis
    })
  });

  app.use(
    session({
      name: 'c19',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10
      }
    })
  );
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.get('/', (_req, res) => {
    res.send('Hello World!');
  });
  app.listen(4000, () => {
    console.log('App listening on port 4000');
  });
};

main().catch((err) => {
  console.error(err);
});
