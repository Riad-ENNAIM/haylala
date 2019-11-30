const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/userController');
const passport = require('passport');


// @route  GET api/users/test
// @desc   Test users route
// @access Public
router.get('/test', (req, res) => res.json({msg: "User router works"}));

// @route  POST api/users/register
// @desc   Register user
// @access Public
router.post('/register', userController.register);

// @route  POST api/users/login
// @desc   Login user / Returning JWT token
// @access Public
router.post('/login', userController.login);

// @route  POST api/users/current
// @desc   Return current user
// @access Private
router.get(
    '/current',
    passport.authenticate('jwt', {session: false}),
    userController.current
);

module.exports = router;