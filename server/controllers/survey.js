// create a reference to the model
const Survey = require('../models/survey');
const Resault = require('../models/resault');
const { text } = require('express');

/* display create survey page */
module.exports.displayCreate = (req, res, next) =>
{
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayname: req.user ? req.user.displayname: ''
        });
    }
    else
    {
        res.render('survey/create', {title: 'Create', displayname: req.user ? req.user.displayname: ''});
    }
}

/* post create survey page */
module.exports.preformCreate = (req, res, next) =>
{
    let newSurvey = Survey({
        "nameUser": req.body.nameUser,

        "title": req.body.title,

        "dateStart": req.body.dateStart,
        "dateEnd": req.body.dateEnd,

        "count":0,

        "textFieldTitle": req.body.textFieldTitle,
        "textFieldPlaceHolder": req.body.textFieldPlaceHolder,

        "selectTitle": req.body.selectTitle,
        "selectOption1": req.body.selectOption1,
        "selectOption2": req.body.selectOption2,
        "selectOption3": req.body.selectOption3,

        "mcqTitle": req.body.mcqTitle,

        "mcqOption1": req.body.mcqOption1,
        "mcqOption2": req.body.mcqOption2,
        "mcqOption3": req.body.mcqOption3,
        "mcqOption4": req.body.mcqOption4,

        "mcqTitle1": req.body.mcqTitle1,
        "mcqTitle2": req.body.mcqTitle2,
        "mcqTitle3": req.body.mcqTitle3,
        "mcqTitle4": req.body.mcqTitle4,

    });
    Survey.create(newSurvey, (err, Survey) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/home');
        }
    })
}

/* display take survey page */
module.exports.displaySurvey = (req, res, next) =>
{
    let idSurvey = req.params.idSurvey;
    console.log(idSurvey);
    Survey.findById(idSurvey, (err, surveyToView) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('survey/view', {title: 'View', 
            survey: surveyToView,
            displayname: req.user ? req.user.displayname : ''
        })
        }
    })
}

module.exports.preformSurvey = (req, res, next) =>
{
    let newResault = Resault({
        "idSurvey":req.params.idSurvey,
        "textField": req.body.textField,

        "selectOption1":(req.body.selectOption1 == 'on') ? true: false,
        "selectOption2":(req.body.selectOption2 == 'on') ? true: false,
        "selectOption3":(req.body.selectOption3 == 'on') ? true: false,

        "mcq1":req.body.mcq1,
        "mcq2":req.body.mcq2,
        "mcq3":req.body.mcq3,
        "mcq4":req.body.mcq4
    });
    Resault.create(newResault, (err, Resault) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/home');
        }
    })
}

module.exports.displayResaultsPage = (req, res, next) =>
{
    Survey.find ({nameUser:req.params.nameUser},(err, surveyList) => {
        if (err)
        {
            return console.error(err);
        }
        else
        {
            res.render('survey/resaults', 
            {title: 'Resaults',
             SurveyList: surveyList, 
             displayname: req.user ? req.user.displayname : ''});
        }
    });
}

module.exports.displayResault = (req, res, next) =>
{
    Resault.find ({idSurvey:req.params.idSurvey},(err, resaultList) => {
        if (err)
        {
            return console.error(err);
        }
        else
        {
            let count = resaultList.length;
            let textFieldValues = [];
            let selectOptions = {option1:0,option2:0,option3:0}
            let mcq1= {option1:0,option2:0,option3:0,option4:0}
            let mcq2= {option1:0,option2:0,option3:0,option4:0}
            let mcq3= {option1:0,option2:0,option3:0,option4:0}
            let mcq4= {option1:0,option2:0,option3:0,option4:0}
            for(const element of resaultList)
            {
                if (element.textField) {textFieldValues.push(element.textField)}
                /* select */
                if (element.selectOption1) {selectOptions.option1 += 1;}
                if (element.selectOption2) {selectOptions.option2 += 1;}
                if (element.selectOption3) {selectOptions.option3 += 1;}
                /* mcq1 */
                if      (element.mcq1 == 1) {mcq1.option1 += 1;}
                else if (element.mcq1 == 2) {mcq1.option2 += 1;}
                else if (element.mcq1 == 3) {mcq1.option3 += 1;}
                else if (element.mcq1 == 4) {mcq1.option4 += 1;}
                /* mcq2 */
                if      (element.mcq2 == 1) {mcq2.option1 += 1;}
                else if (element.mcq2 == 2) {mcq2.option2 += 1;}
                else if (element.mcq2 == 3) {mcq2.option3 += 1;}
                else if (element.mcq2 == 4) {mcq2.option4 += 1;}
                /* mcq3 */
                if      (element.mcq3 == 1) {mcq3.option1 += 1;}
                else if (element.mcq3 == 2) {mcq3.option2 += 1;}
                else if (element.mcq3 == 3) {mcq3.option3 += 1;}
                else if (element.mcq3 == 4) {mcq3.option4 += 1;}
                /* mcq4 */
                if      (element.mcq4 == 1) {mcq4.option1 += 1;}
                else if (element.mcq4 == 2) {mcq4.option2 += 1;}
                else if (element.mcq4 == 3) {mcq4.option3 += 1;}
                else if (element.mcq4 == 4) {mcq4.option4 += 1;}
            }
            console.log(count)
            console.log(textFieldValues)
            console.log(selectOptions)
            console.log(mcq1)
            console.log(mcq2)
            console.log(mcq3)
            console.log(mcq4)
            Survey.findById(req.params.idSurvey, (err, currentSurvey) => {
                if (err)
                {
                    return console.error(err);
                }
                else
                {
                    res.render('survey/resault', 
                    {title: 'Survey Resault',
                    survey: currentSurvey, 
                    Count:count,
                    TextFieldValues:textFieldValues,
                    SelectOptions:selectOptions,
                    MCQ1:mcq1,
                    MCQ2:mcq1,
                    MCQ3:mcq1,
                    MCQ4:mcq1,
                    displayname: req.user ? req.user.displayname : ''});
                }
            });
        }
    });
}

module.exports.preformDelete = (req, res, next) =>
{
    Resault.find({idSurvey:req.params.idSurvey},(err, resaultList) => {
        if (err)
        {
            return console.error(err);
        }
        else
        {
            resaultList.forEach(element => {
                Resault.remove({id_:element._id}, (err) => {
                    if(err)
                        {
                            console.log(err);
                            res.end(err);
                        }
                });
            });
        }
    });
    Survey.remove({_id: req.params.idSurvey}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/home');
        }
    });
}
