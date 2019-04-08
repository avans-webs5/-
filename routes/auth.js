var express = require('express');
var router = express.Router();
var passport = require("passport");


router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }),
    function (req, res, next) {
        res.cookie('token',req.user.token, { httpOnly: true })
        res.redirect('/');
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), 
    function (req, res, next) {
        res.cookie('token',req.user.token, { httpOnly: true })
        res.redirect('/');
});


module.exports = router;