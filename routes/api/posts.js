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

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  postController.deletePost
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  postController.likePost
);



// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  postController.unlikePost
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  postController.addCommentToPost
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  postController.deleteCommentFromPost
);

module.exports = router;