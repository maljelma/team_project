let mongoose = require('mongoose');

// create a model class
let resaultModel = mongoose.Schema({
    idSurvey: String,

    textField:String,

    selectOption1:Boolean,
    selectOption2:Boolean,
    selectOption3:Boolean,

    mcq1:Number,
    mcq2:Number,
    mcq3:Number,
    mcq4:Number,
},
{
    collection: "resaults"
}
);

module.exports = mongoose.model('resault', resaultModel);