// const bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt');
const User = require('../../modules/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');


exports.register = (req, res) => {
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
                    if(err) 
                        throw err;
                    newUser.password = hash;
                    newUser.save()
                           .then(user => res.json(user))
                           .catch(err => console.log(err));
                });
            });
        });
};

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user)
                return res.status(404).json({email: 'User not found'});

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        // User Matched
                        const payload = {id: user.id, name: user.name};

                        // Sign User
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            });
                    } else {
                        return res.status(400).json({password: 'Password incorrect'});
                    }
                });
        });
};

exports.current = (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        date: req.user.date,
    });
};