var  config=require('../config/config.json')

var CategoriesModel = require('../model/CategoriesModel'),
uniqid = require('uniqid'),
fs = require('fs'),
mongoose = require('mongoose'),
    doctormodel = require('../model/usermodal'),
    Imageupload = require('../utilities/imageUpload'), imageUpload;

function CategoriesContoller() {
    catmod = new CategoriesModel();
    this.doctormodel = doctormodel;
}

CategoriesContoller.prototype.create = function (req, res, next) {
    if (!req.body.category_name) {
        res.status(400).json({ status: '400', message: 'Please provide category_name' });
    } else {
    if(req.body.image){
         let d = new Date();
            let time = d.getDate() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds()
            let image_name = time + "_" + uniqid() + ".png";
            let imagePath = "./images/" + image_name;
            let db_path = image_name;
            fs.writeFileSync(imagePath, req.body.image, 'base64');
            req.body.image = db_path
           catmod.create(req.body, function (c_err, c_data) {
        if (c_data) {
            res.status(200).json({ status: '200', message: 'successfully created a new category', response: c_data });
        } else {
            res.status(400).json({ status: '400', error: c_err, message: 'Something went wrong' });
        }
    }) 
    }
    else{
             catmod.create(req.body, function (c_err, c_data) {
        if (c_data) {
            res.status(200).json({ status: '200', message: 'successfully created a new category', response: c_data });
        } else {
            res.status(400).json({ status: '400', error: c_err, message: 'Something went wrong' });
        }
    }) 
    }
    }
}
CategoriesContoller.prototype.getById = function (req, res, next) {
    catmod.getById(req.params, function (c_err, c_data) {
        if (c_data.length) {
            res.status(200).json({ status: '200', message: 'success', response: c_data });
        } else if (c_data.length <= 0) {
            res.status(404).json({ status: '404', message: 'No Categories Found', response: c_data });
        } else {
            res.status(400).json({ status: '400', error: c_err, message: 'Something went wrong' });
        }
    })
}
function cat(data,callback){
 catmod.getdescription(data,(err,response)=>{
 console.log("response..",response)
 callback(data,err,response)
     })
     }

CategoriesContoller.prototype.getAllCategories = function (req, res, next) {
var count=0;var arr=[]
    catmod.getAllCategories(req, function (c_err, data) {
  console.log("data",data)
    if (data.length) {
    

    for(i=0;i< data.length;i++){
    
  cat(data[i],function(element,err,response){
   console.log(response)
     

       var obj={... element}
     
obj. _doc.subdata=response

count++
     if(data.length==count){

  res.status(200).json( {status: '200', error: "", message: "success","result":data,"image_path":config.image_path})
  }
})
 
    }
     } else if (data.length <= 0) {
            res.status(404).json({ status: '404', message: 'No Categories Found', response:data,"image_path":config.image_path});
        } else {
            res.status(400).json({ status: '400', error: c_err, message: 'Something went wrong' });
        }
    })
}
CategoriesContoller.prototype.subcatgiries=function(req,res){
catmod.subcatgiries(req.body,function(err,response){
if(err){
res.status(200).json({"ststus":400,"err_field":"something went to worng",result:""})
}else{
res.status(200).json({"ststus":200,"err_field":"",result:response})
}
})
}
CategoriesContoller.prototype.update = function (req, res, next) {
if(req.body.image){
let d = new Date();
let time = d.getDate() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds()
            let image_name = time + "_" + uniqid() + ".png";
            let imagePath = "./images/" + image_name;
            let db_path = image_name;
            fs.writeFileSync(imagePath, req.body.image, 'base64');
            req.body.image = db_path
    catmod.update(req, function (c_err, c_data) {
        if (c_data) {
            res.status(200).json({ status: '200', message: 'successfully updated', response: c_data });
        } else {
            res.status(400).json({ status: '400', error: c_err, message: 'Something went wrong' });
        }
    })
    }else{
              catmod.update(req, function (c_err, c_data) {
        if (c_data) {
            res.status(200).json({ status: '200', message: 'successfully created a new category', response: c_data });
        } else {
            res.status(400).json({ status: '400', error: c_err, message: 'Something went wrong' });
        }
    }) 
    }
}

CategoriesContoller.prototype.remove = function (req, res, next) {
    catmod.remove(req, function (data) {
        res.status(200).json(data);
    });
};
CategoriesContoller.prototype.getcontentlink =function(req,res){
console.log("gfgfadgdfdg",req.body)
catmod.getcontentlink(req.body,(err,response)=>{
console.log(response)
if(err){
res.sttaus(200).json({"status":400,"err_field":"something went to worng","respose":""})
}else{
res.status(200).json({"ststus":200,"err_field":"",result:response,"image_path":config.image_path})
}
})
}
module.exports = CategoriesContoller;