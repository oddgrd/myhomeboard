import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import { __prod__ } from '../constants';
import { User } from '../entities/User';

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