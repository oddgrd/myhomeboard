import express from 'express';
import passport from 'passport';
import { __prod__ } from '../../constants';

const router = express.Router();
const redirectUrl = __prod__
  ? 'https://myhomeboard.no/'
  : 'http://localhost:3000';

// @route    GET api/auth/google
// @desc     Login redirect to google
// @access   Public
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account' // for using several accounts in dev
  })
);

// @route    GET api/auth/google/callback
// @desc     Google callback URL
// @access   Public
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: redirectUrl,
    failureRedirect: redirectUrl
  })
);

// @route    GET api/auth/logout
// @desc     Log out
// @access   Public
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(redirectUrl);
});

export = router;
