const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('../config');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const router = express.Router();

// TODO: extract class

async function register(req, res) {
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(req.body.password, salt);

    // Create an user object
    let user = new User({
        email: req.body.email,
        name: req.body.name,
        password: hasPassword
    })

    // Save User in the database
    user.save((err, registeredUser) => {
        if (err) {
            console.log(err)
        } else {
            // create payload then Generate an access token
            let payload = { id: registeredUser._id, user_type_id: req.body.user_type_id || 0 };
            const token = jwt.sign(payload, config.TOKEN_SECRET);
            res.status(200).send({ token })
        }
    })
}

async function login(req, res) {
    User.findOne({ email: req.body.email }, async (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (user) {
                const validPass = await bcrypt.compare(req.body.password, user.password);
                if (!validPass) {
                    return res.status(401).send('Invalid email or password');
                }

                // Create and assign token
                let payload = { id: user._id, user_type_id: user.user_type_id };
                const token = jwt.sign(payload, config.TOKEN_SECRET);

                res.status(200).header('auth-token', token).send({ 'token': token });
            }
            else {
                // TODO: better error handling
                res.status(401).send('User not found');
            }

        }
    })
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('list of users');
});

router.post('/register', register);
router.post('/login', login);

module.exports = router;
