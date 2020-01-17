const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController = require('../../controllers/api/postController');

// @route  GET api/posts/test
// @desc   Test posts route
// @access Public
router.get('/test', (req, res) => res.json({msg: "posts router works"}));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', postController.getPosts);

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', postController.getPostById);

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  postController.createPost
);

module.exports = router;