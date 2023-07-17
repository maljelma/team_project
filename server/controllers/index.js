// create a reference to the model
let Survey = require('../models/survey');

module.exports.displayHomePage = (req, res, next) =>
{
    Survey.find ((err, surveyList) => {
        if (err)
        {
            return console.error(err);
        }
        else
        {
            res.render('index', 
            {title: 'Home',
             SurveyList: surveyList, 
             displayname: req.user ? req.user.displayname : ''});
        }
    });
}

