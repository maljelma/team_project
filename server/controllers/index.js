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
let dateValues = (dateString) =>
{
    let dateStringArray = dateString.split('-');
    let values = {year:0,month:0,day:0}
    values.year = parseInt(dateStringArray[0])
    values.month = parseInt(dateStringArray[1])-1
    values.day = parseInt(dateStringArray[2])
    return values
}
let filterSurveysUsingDateOfToday = (surveyList) => 
{
    // array to store selected surveys
    let selectedSurveys = [];

    // get today's date
    let today = new Date();

    // set today's Time to 00:00:00
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)

    surveyList.forEach(element => 
    {  

        // convert string date to objcet with (year,month,day) properties
        let dateStart = dateValues(element.dateStart);
        let dateEnd   = dateValues(element.dateEnd);
        // create date objects for dateStart and dateEnd
        let start = new Date(dateStart.year,dateStart.month,dateStart.day)
        let end   = new Date(dateEnd.year,dateEnd.month,dateEnd.day)
        // only if today is in element dateStart and dateEnd range.
        if (start <= today && today <= end)
        {
            selectedSurveys.push(element);
        }
    });
    return selectedSurveys;
}
