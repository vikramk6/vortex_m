var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    UserOptionsSchema;

var user_questionnaire_options = new Schema({
    doctor_id: {type : ObjectId},
    user_id: {type : ObjectId},
    question_id: {type : ObjectId},
    question : { type: String },
    answer : { type: String },
    answer_type: { type: String },
    answer_id : {type : ObjectId},
    slot_id:{type : ObjectId},
    created_on: { type: Date, default: Date.now }
})




module.exports = UserOptionsSchema = mongoose.model('user_questionnaire_options', user_questionnaire_options);