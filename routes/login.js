var express = require('express');
var router = express.Router();
var session = require('express-session')
var passport = require("passport");
var roles = require('../config/roles-config');

var auth_controller = require('../controllers/authController');

router.post("/", function(req, res, next){
	passport.authenticate('login', function(err, user, info) {
		if (err) { return next(err); }
		if (!user) { 
			session.validLogin = false;
			return res.redirect('/login'); 
		}
		req.logIn(user, function(err) {
		  if (err) { return next(err); }
		  return auth_controller.login(req, res);
		});
	  })(req, res, next);
});

router.get("/", function(req, res, next) {
	if(req.user){
		res.redirect("/admin");
	}else{
		if(session.validLogin === false) {
			res.render('login', { 'errorMessage' : "Incorrect email and/or password." });
		} else {
			res.render('login');
		}
		session.validLogin = null; // resets session variable
	}
});
  


module.exports = router;