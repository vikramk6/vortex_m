
var express = require('express'),
UserQuestionnaireOptions = require('../controllers/UserQuestionnaireOptions'),
UQOptionRoutes = express.Router(),
uqo = new UserQuestionnaireOptions();
 var multer  = require('multer')
 uniqid = require('uniqid');
 let d = new Date();
let time = d.getDate() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds()
let image_name = time + "_" + uniqid() ;
let imagePath = "./images/" + image_name;
var data=multer.diskStorage({
   destination: ((req,file,cb)=>{
   cb(null,'images')
 }),
  filename :((req,file,callback) =>{
     //var name=(file.mimetype).split("/")[1]
     //console.log(sp)
     //callback(null,image_name+"."+name)
     callback(null,image_name+file.originalname)
  })
})
var upload=multer({ storage:data})

UQOptionRoutes.post('/',upload.single('answer'),uqo.createUserCase.bind(uqo));
UQOptionRoutes.get('/', uqo.getAllQuestionaireOptions.bind(uqo));
UQOptionRoutes.get('/user_id/:user_id/:question_id', uqo.getQuesByUserId.bind(uqo));
UQOptionRoutes.post('/getuserquestion',uqo.getuserquestion.bind(uqo))





module.exports = UQOptionRoutes;