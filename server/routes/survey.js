let express = require('express');
let router = express.Router();

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check is the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/auth/login');
    }
    next();
}

let surveyContoller = require('../controllers/survey')


// view list of all surveys using user id
router.get('/resaults/:nameUser',requireAuth,surveyContoller.displayResaultsPage)

// view resault page using survey id
router.get('/resault/:idSurvey',requireAuth,surveyContoller.displayResault)

// create a survey
router.get('/create',requireAuth,surveyContoller.displayCreate)
router.post('/create',requireAuth,surveyContoller.preformCreate)

// take a survey using survey id
router.get('/view/:idSurvey',surveyContoller.displaySurvey)
router.post('/view/:idSurvey',surveyContoller.preformSurvey)

// delete a survey using survey id
router.get('/delete/:idSurvey',requireAuth,surveyContoller.preformDelete)

module.exports = router;