// const bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


exports.register = (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email})
    .then(user => {
      if(user) {
        errors.email =  'Email already exists';
        return res.status(400).json(errors);
      }

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      
      console.log(newUser)

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
  const {errors, isValid} = validateLoginInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
    .then(user => {
      if(!user){
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }

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
            errors.password = 'Password incorrect';
            return res.status(400).json(errors);
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