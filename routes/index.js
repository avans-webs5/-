var express = require('express');
var router = express.Router();
var passport = require("passport");
var roles = require('../config/roles-config');

var index_controller = require('../controllers/indexController');

/* GET home page. */
router.get('/', index_controller.show_home);



module.exports = router;
