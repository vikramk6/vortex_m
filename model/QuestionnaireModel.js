var QuestionareSchema = require('./schemas/QuestionareSchema'),
  mongoose = require('mongoose'),
    ques;




function QuestionareModel() {
    ques = QuestionareSchema;
}

// QuestionareModel.prototype.getQuestionaire = function (req, callback) {
//     ques.find({final_content_id: req.final_content_id}, callback)
// }
QuestionareModel.prototype.getQuestionaire = function (req, callback) {
    ques.find({}, callback)
}

QuestionareModel.prototype.getQuestionaireById = function (req, callback) {
    ques.find({_id: req.id}, callback)
}

QuestionareModel.prototype.getAllQuestions = function (req, callback) {
    ques.aggregate([{
  $lookup: {
             from: 'final-contents',
            localField: 'final_content_id',
            foreignField: '_id',
            as: 'final_content'
        }
    }
    ], callback)
}



QuestionareModel.prototype.create = function (req, callback) {
    ques.create(req.body, callback)
}

QuestionareModel.prototype.update = function (req, callback) {
    ques.update({_id: req.params.question_id}, req.body,{ multi: true },callback)
}

QuestionareModel.prototype.remove = function (req, callback) {
    ques.remove({ _id: req.params.id }, callback);
}
QuestionareModel.prototype.basedoncatsubcatids =function(data,callback){

ques.find({$and:[{category_id:data.category_id},{sub_category_id:data.sub_category_id}]},callback)
}

module.exports = QuestionareModel;