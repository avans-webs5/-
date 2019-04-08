var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require("passport");
var roles = require('../config/roles-config');

var matches_controller = require('../controllers/matchController');

/**
 * @swagger
 * /matches:
 *   get:
 *     tags:
 *       - matches
 *     description: Gets a collection of matches
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A collection of the matches
 */
router.get('/', passport.authenticate('jwt', { session: false }), roles.is("admin"), (req, res) => matches_controller.list_matches(req, res));


module.exports = router;
