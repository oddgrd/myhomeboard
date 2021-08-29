import 'reflect-metadata';
import 'dotenv-safe/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { BoardResolver } from './resolvers/boardResolver';
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
import { Strategy } from 'passport-google-oauth20';
import passport from 'passport';
import authRoutes from './routes/api/auth';
import { Ascent } from './entities/Ascent';
import { graphqlUploadExpress } from 'graphql-upload';

const main = async () => {
  const connection = await createConnection({
    applicationName: 'myhomeboard',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [User, Problem, Board, Ascent],
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
  app.use(graphqlUploadExpress());

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, ProblemResolver, BoardResolver],
      validate: false
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis
    })
  });

  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `http://localhost:4000/api/auth/google/callback`
      },
      async (_accessToken, _refreshToken, profile: any, done) => {
        const user = await User.findOne({ where: { googleId: profile.id } });
        if (user) {
          await User.update(
            { id: user.id },
            {
              name: profile.displayName,
              avatar: profile._json.picture
            }
          );
          done(null, user);
        } else {
          try {
            const newUser = await User.create({
              name: profile.displayName,
              email: profile._json.email,
              avatar: profile._json.picture,
              googleId: profile.id
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
    console.log('id:', id);
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
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10
      }
    })
  );

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.use(passport.initialize());
  app.use(passport.session());

  // Google oauth routes
  app.use('/api/auth', authRoutes);

  app.listen(4000, () => {
    console.log('App listening on port 4000');
  });
};

main().catch((err) => {
  console.error(err);
});
