const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt');
const User = require('../../modules/User');

// @route  GET api/users/test
// @desc   Test users route
// @access Public
router.get('/test', (req, res) => res.json({msg: "User router works"}));

// @route  POST api/users/register
// @desc   Register user
// @access Public
router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user) return res.status(400).json({email: 'Email already exists'});

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                           .then(user => res.json(user))
                           .catch(err => console.log(err));
                });
            });
        });
});

module.exports = router;