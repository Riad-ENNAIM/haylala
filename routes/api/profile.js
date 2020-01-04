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

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', profileController.getAllProfiles);

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', profileController.getProfilesByHandle);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', profileController.getProfilesByUser);

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  profileController.createOrEditProfile
);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  profileController.addExperienceToPorfile
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  profileController.addEducationToPorfile
);

module.exports = router;