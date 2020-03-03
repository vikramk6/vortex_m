
var express = require('express'),
QuestionnaireController = require('../controllers/QuestionnaireController'),
QuestionnaireRoutes = express.Router(),
question = new QuestionnaireController();

 QuestionnaireRoutes.get('/get_questions', question.getQuestions.bind(question));
 QuestionnaireRoutes.get('/all', question.getAllQuestions.bind(question));
 QuestionnaireRoutes.get('/questionaire_id/:id', question.getQuestionaireById.bind(question));
QuestionnaireRoutes.post('/', question.create.bind(question));
 QuestionnaireRoutes.put('/:question_id', question.update.bind(question));
 QuestionnaireRoutes.post('/basedoncatsubcatids', question.basedoncatsubcatids.bind(question));
QuestionnaireRoutes.delete('/:id', question.remove.bind(question));


module.exports = QuestionnaireRoutes;