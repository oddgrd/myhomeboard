import express from 'express';
import passport from 'passport';

const router = express.Router();

// @route    GET api/auth/google
// @desc     Login redirect to google
// @access   Public
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// @route    GET api/auth/google/callback
// @desc     Google callback URL
// @access   Public
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `http://localhost:3000`,
    failureRedirect: '/api/auth/login/failed'
  })
);

// @route    GET api/auth/logout
// @desc     Log out
// @access   Public
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(`http://localhost:3000`);
});

export = router;
