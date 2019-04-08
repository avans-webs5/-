var express = require('express');
var router = express.Router();
var passport = require("passport");
var roles = require('../config/roles-config');

var admin_controller = require('../controllers/adminController');

// Home
router.get('/', passport.authenticate('jwt', { session: false }), roles.is('admin'), admin_controller.show_home);

// Users
router.get('/users', passport.authenticate('jwt', { session: false }), roles.is('admin'), admin_controller.show_users);

// Matches
router.get('/matches', passport.authenticate('jwt', { session: false }), roles.is('admin'), admin_controller.show_matches);

// Roles
router.get('/roles', passport.authenticate('jwt', { session: false }), roles.is('admin'), admin_controller.show_roles);



module.exports = router;