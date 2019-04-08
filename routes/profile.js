const express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var url = require('url');
var passport = require("passport");
var roles = require('../config/roles-config');

const { check, validationResult } = require('express-validator/check');

var profile_controller = require('../controllers/profileController');


router.get('/', passport.authenticate('jwt', { session: false }), profile_controller.get_profile);
router.post('/', passport.authenticate('jwt', { session: false }), profile_controller.get_profile);

/**
 * @swagger
 * /profile/likes:
 *   put:
 *     tags:
 *       - profile
 *     description: Adds a like to a user and makes a match when the user that is liked has already liked you
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A succes message
 *       400:
 *         description: Something went wrong... Students are working hard to resolve this problem
 *       409:
 *         description: Duplicate user like, already liked the user
 *     parameters:
 *      - name: user
 *        in: formData
 *        type: string
 *        required: true
 *        description: The id of the user that is being liked
 */
router.put('/likes', passport.authenticate('jwt', { session: false }), profile_controller.add_like);



/**
 * @swagger
 * /profile/dislikes:
 *   put:
 *     tags:
 *       - profile
 *     description: Adds a dislike to a user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A succes message
 *       400:
 *         description: Something went wrong... Students are working hard to resolve this problem
 *       409:
 *         description: Duplicate user like, already disliked the user
 *     parameters:
 *      - name: user
 *        in: formData
 *        type: string
 *        required: true
 *        description: The id of the user that is being disliked
 */
router.put('/dislikes', passport.authenticate('jwt', { session: false }), profile_controller.add_dislike);


module.exports = router;