const mongoose = require('mongoose');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


exports.profile = (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
};