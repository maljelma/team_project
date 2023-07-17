let express = require('express');
let router = express.Router();

let authController = require('../controllers/auth')

/* GET Route for displaying the Login page */
router.get('/login', authController.displayLoginPage);

/* POST Route for Processing the Login page */
router.post('/login', authController.processLoginPage);

/* GET Route for displaying the Register page */
router.get('/register', authController.displayRegisterPage);

/* POST Route for Processing the Register page */
router.post('/register', authController.processRegisterPage);

/* GET Route for perform userLogout */
router.get('/logout', authController.preformLogout);

module.exports = router;