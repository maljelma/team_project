let express = require('express');
let router = express.Router();

let surveyContoller = require('../controllers/survey')

router.get('/create',surveyContoller.displayCreate)
router.get('/view/:idSurvey',surveyContoller.displaySurvey)
router.get('/resaults/:nameUser',surveyContoller.displayResaultsPage)
router.get('/resault/:idSurvey',surveyContoller.displayResault)

router.post('/create',surveyContoller.preformCreate)
router.post('/view/:idSurvey',surveyContoller.preformSurvey)


router.get('/delete/:idSurvey',surveyContoller.preformDelete)

module.exports = router;