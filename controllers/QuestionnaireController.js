var QuestionnaireModel = require('../model/QuestionnaireModel'),
mongoose = require('mongoose'),
    doctormodel = require('../model/usermodal');

function QuestionnaireController() {
    questionnaireModel = new QuestionnaireModel();
    this.doctormodel = doctormodel;
}

QuestionnaireController.prototype.create = function (req, res, next) {
    if (!req.body.doctor_id) {
        res.status(200).json({ status: '404', message: "Please provide doctor_id" });
    } else if (!req.body.sub_category_id) {
        res.status(200).json({ status: '404', message: "Please provide sub_category_id" });
    } else if (!req.body.question) {
        res.status(200).json({ status: '404', message: "Please provide question" });
    }  else if (!req.body.choice.length) {
        res.status(200).json({ status: '404', message: "Please provide choices" });
    } else {
        var data = req.body.choice;
         delete req.body.choice;
         req.body.choice = data.map(function (obj,index) {
            return { answer : obj }
        })
        Promise.all(req.body.choice).then(function (results) {
            questionnaireModel.create(req, function (err, resposne) {
                if (err) {
                    res.status(200).json({ status: '400', message: "Something Went Wrong" });
                } else {
                    console.log(resposne)
                    res.status(200).json({ status: '200', response: resposne, message: "Successfully inserted" });
                }
            })
        })
    }
}

QuestionnaireController.prototype.getQuestions = function (req, res, next) {
    questionnaireModel.getQuestionaire(req , function (err, response) {
        if(err) {
             res.status(200).json({ status: '400', message: "Something Went Wrong", error: err }); 
        } else {
          res.status(200).json({ status: '200', response: response, message: "Success" }); 
        }
    })
}

QuestionnaireController.prototype.getQuestionaireById = function (req, res, next) {
    questionnaireModel.getQuestionaireById(req.params , function (err, response) {
        if(err) {
             res.status(200).json({ status: '400', message: "Something Went Wrong", error: err }); 
        } else {
          res.status(200).json({ status: '200', response: response, message: "Success" }); 
        }
    })
}

QuestionnaireController.prototype.getAllQuestions = function (req, res, next) {
    questionnaireModel.getAllQuestions({} , function (err, response) {
        if(err) {
             res.status(200).json({ status: '400', message: "Something Went Wrong", error: err }); 
        } else {
          res.status(200).json({ status: '200', response: response, message: "Success" }); 
        }
    })
}

QuestionnaireController.prototype.update = function (req, res, next) {
    if (req.body.choice) {
          var data = req.body.choice;
         delete req.body.choice;
        req.body.choice = data.map(function (obj, index) {
            return { answer: obj }
        })

        Promise.all(req.body.choice).then(function (results) {
            questionnaireModel.update(req, function (err, response) {
                if (err) {
                    res.status(200).json({ status: '400', message: "Something Went Wrong", error: err });
                } else {
                    res.status(200).json({ status: '200', response: response, message: "Successfully Updated" });
                }
            })
        })
    } else {
        questionnaireModel.update(req, function (err, response) {
            if (err) {
                res.status(200).json({ status: '400', message: "Something Went Wrong", error: err });
            } else {
                res.status(200).json({ status: '200', response: response, message: "Successfully Updated" });
            }
        })
    }
}

QuestionnaireController.prototype.remove = function (req, res, next) {
    questionnaireModel.remove(req, function (err, response) {
            if (err) {
                res.status(200).json({ status: '400', message: "Something Went Wrong", error: err });
            } else {
                res.status(200).json({ status: '200', response: response, message: "Successfully Deleted" });
            }
        })
    }

QuestionnaireController.prototype.basedoncatsubcatids=function(req,res){

questionnaireModel.basedoncatsubcatids(req.body,function(err,response){
   if (err) {
                res.status(200).json({ status: '400', message: "Something Went Wrong", error: err });
            } else {
                res.status(200).json({ status: '200', response: response, message: "" });
            }
})
}


module.exports = QuestionnaireController;