const express = require('express');
const router = express.Router();
const passport = require('passport');
const profileController = require('../../controllers/api/profileController');

// @route  GET api/profile/test
// @desc   Test profile route
// @access Public
router.get('/test', (req, res) => res.json({msg: "profile router works"}));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    profileController.getProfile
);

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  profileController.createOrEditProfile
);

module.exports = router;