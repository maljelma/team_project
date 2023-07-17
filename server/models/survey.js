let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    nameUser:String,

    title: String,

    dateStart:String,
    dateEnd:String,

    count:Number,

    textFieldTitle:String,
    textFieldPlaceHolder:String,

    selectTitle:String,
    selectOption1:String,
    selectOption2:String,
    selectOption3:String,

    mcqTitle:String,

    mcqOption1:String,
    mcqOption2:String,
    mcqOption3:String,
    mcqOption4:String,

    mcqTitle1:String,
    mcqTitle2:String,
    mcqTitle3:String,
    mcqTitle4:String,

},
{
    collection: "surveys"
}
);

module.exports = mongoose.model('survey', surveyModel);