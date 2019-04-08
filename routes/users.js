const express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var url = require('url');
var passport = require("passport");
var roles = require('../config/roles-config');

const { check, validationResult } = require('express-validator/check');

var users_controller = require('../controllers/userController');
var matches_controller = require('../controllers/matchController');

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *       403:
 *         description: No access to get all users from the api
 */
router.get('/', passport.authenticate('jwt', { session: false }), roles.is("admin"), users_controller.list_users );

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - users
 *     description: Creates a new user
 *     consumes: application/x-www-form-urlencoded
 *     parameters:
 *       - name: firstName
 *         in: formData
 *         type: string
 *         required: true
 *         description: The first name of the user
 *       - name: lastName
 *         in: formData
 *         type: string
 *         required: true
 *         description: The last name of the user
 *       - name: email
 *         in: formData
 *         type: string
 *         required: true
 *         description: The email
 *       - name: password
 *         in: formData
 *         type: string
 *         required: true
 *         description: The password
 *       - name: birthDate
 *         in: formData
 *         type: string
 *         required: true
 *         description: The date of birth
 *       - name: study
 *         in: formData
 *         type: string
 *         required: true
 *         description: The name of the study the user is following
 *       - name: studyYear
 *         in: formData
 *         type: string
 *         required: true
 *         description: The year of the study
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The user as a json object
 *       422:
 *         description: Validation error, Returns the validation errors per field as a json object
 */
router.post('/',  [
        // firstname
        check('firstName').isString().isLength({ max: 255 }).not().isEmpty(),
        // lastname
        check('lastName').isString().isLength({ max: 255 }),
        // email
        check('email').isEmail(),
        // password
        check('password').isLength({ min: 3, max: 20 }),
        // birthdate
        check('birthDate').isISO8601(),
        // study
        check('study').isLength({ max: 255 }),
        // studyyear
        check('studyYear').isNumeric().isLength(1)
      ], (req, res) =>  users_controller.add_user(req, res)
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Gets a specific user
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Numeric ID of the user to get
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), roles.is("self"),  (req, res) => users_controller.get_user_byID(req, res));

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - users
 *     description: Deletes a user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A succes message
 *     parameters:
 *      - name: id
 *        in: path
 *        type: string
 *        required: true
 *        description: Numeric ID of the user to delete
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), roles.is("self"), (req, res) => users_controller.delete_user(req, res));



/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - users
 *     description: Edit a user's information
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A succes message
 *     parameters:
 *      - name: id
 *        in: path
 *        type: string
 *        required: true
 *        description: Numeric ID of the user to edit
 *      - name: password
 *        in: formData
 *        type: string
 *        required: true
 *        description: User's password
 *      - name: profilePicture
 *        in: formData
 *        type: string
 *        required: true
 *        description: The url of the profile picture
 *      - name: study
 *        in: formData
 *        type: string
 *        required: true
 *        description: The name of the study
 *      - name: studyYear
 *        in: formData
 *        type: string
 *        required: true
 *        description: The year of the study
 * 
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), roles.is('self'), users_controller.edit_user);

/**
 * @swagger
 * /users/{id}/matches:
 *   get:
 *     tags:
 *       - matches
 *     description: Gets the matches of the given user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A collection of the matches of the user
 *     parameters:
 *      - name: id
 *        in: path
 *        type: string
 *        required: true
 *        description: Numeric ID of the user to get the matches from
 */
router.get('/:id/matches', passport.authenticate('jwt', { session: false }), roles.is('self'), (req, res) => matches_controller.get_matches_byUser(req, res));




module.exports = router;
