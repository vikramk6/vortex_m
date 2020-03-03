var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    QuestionareSchema;

var choosing = new Schema({
    answer: { type: String }
})

var questionare = new Schema({
    doctor_id: { type: ObjectId },
     category_id: { type: ObjectId },
    sub_category_id: { type: ObjectId },
    question: { type: String ,  default: ''},
    choice: [choosing],
    question_type:{ type: String },
    note:{type: String},
    created_on: { type: Date, default: Date.now }
});

module.exports = QuestionareSchema = mongoose.model('questionare', questionare);