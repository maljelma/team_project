let express = require('express');
let router = express.Router();
let passport = require("passport");

let indexController = require('../controllers/index')

/* GET home page. */
router.get('/'    ,indexController.displayHomePage);
router.get('/home', indexController.displayHomePage);

module.exports = router;
