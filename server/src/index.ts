import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import { graphqlUploadExpress } from 'graphql-upload';
import Redis from 'ioredis';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
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

  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: __prod__
          ? `https://api.myhomeboard.no/api/auth/google/callback`
          : 'http://localhost:4000/api/auth/google/callback',
      },
      async (_accessToken, _refreshToken, profile: any, done) => {
        const user = await User.findOne({ where: { googleId: profile.id } });
        if (user) {
          await User.update(
            { id: user.id },
            {
              name: profile.displayName,
              avatar: profile._json.picture,
            }
          );
          done(null, user);
        } else {
          try {
            const newUser = await User.create({
              name: profile.displayName,
              email: profile._json.email,
              avatar: profile._json.picture,
              googleId: profile.id,
            }).save();
            done(null, newUser);
          } catch (error) {
            done(error);
          }
        }
      }
    )
  );
  passport.serializeUser(function (user: any, done) {
    done(null, user.id);
  });
  passport.deserializeUser((id: string, done) => {
    User.findOne(id).then((user) => {
      done(null, user);
    });
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
        sameSite: 'none',
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
