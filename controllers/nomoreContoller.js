var nomoremodel = require('../model/nomoreModel');


function nomoreContoller() {
       nmc= new nomoremodel ();
}
nomoreContoller.prototype.create =function(req,res){

nmc.create(req.body,function(err,response){
if(err){
res.status(200).json({"status":400,"err_field":"something went to worng","response":""})
}else{
res.status(200).json({"status":200,"err_fild":"","response":response})
}
})
}
nomoreContoller.prototype.getnomoredata =function(req,res){
nmc.getnomoredata((err,response)=>{
 if(err){
 res.status(200).json({"status":400,"err_field":"something went to worng","response":""})
 }else{
 res.status(200).json({"status":200,"err_fild":"","response":response})
 }
})
}
nomoreContoller.prototype.getById=function(req,res){
nmc.getById(req,(err,response)=>{
if(err){
 res.status(200).json({"status":400,"err_field":"something went to worng","response":""})
}else{
 res.status(200).json({"status":200,"err_fild":"","response":response})
}
})
}
nomoreContoller.prototype.update=function(req,res){
nmc.update(req,(err,response)=>{
if(err){
 res.status(200).json({"status":400,"err_field":"something went to worng","response":""})
}else{
 res.status(200).json({"status":200,"err_fild":"","response":"updated sucessfully"})
}
})
}
module.exports=nomoreContoller