import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import { graphqlUploadExpress } from 'graphql-upload';
import Redis from 'ioredis';
import passport from 'passport';
import path from 'path';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { __prod__ } from './constants';
import { Ascent } from './entities/Ascent';
import { Board } from './entities/Board';
import { Layout } from './entities/Layout';
import { Problem } from './entities/Problem';
import { User } from './entities/User';
import authRoutes from './routes/api/auth';
import { createLayoutLoader } from './utils/createLayoutLoader';
import { createSchema } from './utils/createSchema';
import { createUserLoader } from './utils/createUserLoader';

// Passport configuration
import "./config/passport";

const main = async () => {
  const connection = await createConnection({
    applicationName: 'myhomeboard',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [User, Problem, Layout, Ascent, Board],
    migrations: [path.join(__dirname, './migrations/*')],
    logging: true,
    synchronize: false,
  });
  await connection.runMigrations();
  const app = express();

  const devWhitelist = [
    'https://studio.apollographql.com',
    'http://localhost:3000',
  ];
  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: __prod__
        ? process.env.CORS_ORIGIN
        : function (origin, callback) {
            if (!origin || devWhitelist.indexOf(origin) !== -1) {
              callback(null, true);
            } else {
              callback(new Error('Not allowed by CORS'));
            }
          },
      credentials: true,
    })
  );

  // nginx client_max_body_size is also set to 5mb
  app.use(
    graphqlUploadExpress({ maxFileSize: 5000000, maxFieldSize: 5000000 })
  );

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  const apolloServer = new ApolloServer({
    schema: await createSchema(),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      layoutLoader: createLayoutLoader(),
    }),
  });

  app.use(
    session({
      name: 'mhb',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        secure: __prod__,
        sameSite: __prod__ ? 'none' : 'lax',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        domain: __prod__ ? '.myhomeboard.no' : undefined,
      },
    })
  );

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.use(passport.initialize());
  app.use(passport.session());

  // Google oauth routes
  app.use('/api/auth', authRoutes);

  // Block faulty favicon 404
  app.get('/favicon.ico', (_, res) => res.status(204));

  app.listen(parseInt(process.env.PORT), () => {
    console.log(`App listening on port ${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
