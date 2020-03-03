var UserQuesOptionsModel = require('../model/UserQuesOptionsModel.js'),
Imageupload = require('../utilities/imageUpload'), imageUpload,
 VideoUpload = require('../utilities/VideoUpload'), videoUpload;

function UserQuestionnaireOptions() {
   uqom = new UserQuesOptionsModel();
}

UserQuestionnaireOptions.prototype.createUserCase = function (req, res) {

if(req.file){
req.body.answer =req.file.path.split("/")[1]
}
          uqom.create(req, function (err, data) {
        if(err) {
            res.status(400).json({status:400, message:"Something Went Wrong", response:data});
        } else {
            res.status(200).json({status:200, message:"Successfully Inserted", response:data}); 
        }
    })
    
  
}

UserQuestionnaireOptions.prototype.getAllQuestionaireOptions = function (req, res) {
    uqom.getAllQuestionaireOptions(function (err, data) {
      if(err) {
            res.status(400).json({status:400, message:"Something Went Wrong", error:err, response:data});
        } else {
            res.status(200).json({status:200, message:"Success", response:data}); 
        }  
    })
}

UserQuestionnaireOptions.prototype.getQuesByUserId = function (req, res) {
    uqom.getQuesByUserId(req.params, function (err, data) {
      if(err) {
            res.status(400).json({status:400, message:"Something Went Wrong", error:err, response:data});
        } else {
            res.status(200).json({status:200, message:"Success", response:data}); 
        }  
    })
}
UserQuestionnaireOptions.prototype.getuserquestion =function(req,res){
uqom.getuserquestion (req.body,(err,response)=>{
if(err){
res.status(400).json({status:400, message:"Something Went Wrong", error:err, response:data});
}else{
 res.status(200).json({status:200, message:"Success", response:response}); 
}
})
}
module.exports = UserQuestionnaireOptions; 