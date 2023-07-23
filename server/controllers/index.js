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
            // fillter surveys
            let currentSurveys = filterSurveysUsingDateOfToday(surveyList);
            res.render('index', 
            {title: 'Home',
             SurveyList: currentSurveys, 
             displayname: req.user ? req.user.displayname : ''});
        }
    });
}

let filterSurveysUsingDateOfToday = (surveyList) => 
{
    let selectedSurveys = [];
    let today = new Date();
    
    surveyList.forEach(element => 
    {  
        let start = new Date(element.dateStart);
        let end   = new Date(element.dateEnd);
        // only if today is in  element dateStart and dateEnd range.
        if 
        (
        (start.getUTCFullYear() <= today.getFullYear()) && 
        (today.getFullYear() <= end.getUTCFullYear()) &&
        (start.getUTCMonth() <= today.getMonth()) &&
        (today.getMonth() <= end.getUTCMonth()) &&
        (start.getUTCDate() <= today.getDate()) &&
        (today.getDate() <= end.getUTCDate())
        )
        {
            selectedSurveys.push(element);
        }
    });
    return selectedSurveys;
}
