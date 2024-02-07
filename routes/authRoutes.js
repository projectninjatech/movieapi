const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User')

router.post('/register', async (req, res) => {
    try {
        const isAdmin = req.body.isAdmin === true; // Set isAdmin to true if it's explicitly set to true in the request body
        const user = await User.register(new User({ username: req.body.username, isAdmin }), req.body.password);
        passport.authenticate('local')(req, res, () => {
            res.json({ success: true, user });
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        if (!user) {
            return res.json({ success: false, message: 'Authentication failed' });
        }

        // If authentication is successful, manually log in the user
        req.logIn(user, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({ success: false, error: loginErr.message });
            }
            // Send a success response
            return res.json({ success: true, user });
        });
    })(req, res, next);
});

router.get('/check-auth', (req, res) => {
    console.log("User auth", req.isAuthenticated())
    if (req.isAuthenticated()) {
        // User is authenticated
        res.json({ authenticated: true, user: req.user });
    } else {
        // User is not authenticated
        res.json({ authenticated: false, user: null });
    }
});

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true });
    });
});

router.get('/admin/register', (req, res) => {
    res.render('adminRegister'); // Assuming 'adminRegister.hbs' exists in the 'views' folder
});

router.post('/admin/register', async (req, res) => {
    try {
        // Check if the secret code is valid
        const secretCode = req.body.secretCode;
        if (secretCode !== 'abcd1234') {
            return res.render('adminRegister', { errorMessage: 'Invalid secret code' });
        }

        // Validate other inputs and register the admin
        const isAdmin = true;
        const user = await User.register(new User({ username: req.body.username, isAdmin }), req.body.password);
        passport.authenticate('local')(req, res, () => {
            // res.json({ success: true, user });
            res.redirect('/admin/login');
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/admin/login', (req, res) => {
    res.render('adminLogin'); // Assuming 'adminLogin.hbs' exists in the 'views' folder
});

router.post('/admin/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }

        if (!user) {
            // return res.json({ success: false, message: 'Authentication failed' });
            return res.render('adminLogin', { errorMessage: 'Authentication failed' });
        }

        // Check if the user is an admin
        if (!user.isAdmin) {
            // return res.json({ success: false, message: 'You are not an admin' });
            return res.render('adminLogin', { errorMessage: 'You are not an admin' });
        }

        // If authentication is successful and the user is an admin, manually log in the user
        req.logIn(user, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({ success: false, error: loginErr.message });
            }

            // Send a success response
            // return res.json({ success: true, user });
            res.redirect('/')
        });
    })(req, res, next);
});

router.get('/admin/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.redirect('/admin/login')
    });
});


module.exports = router;