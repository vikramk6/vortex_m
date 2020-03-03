nomoreschema =require('./schemas/nomoreSchema')
function  nomoreModel(){
}
nomoreModel.prototype.create =function(data,callback){

var nms=new nomoreschema(data)
nms.save(nms,callback)
}
nomoreModel.prototype.getnomoredata=function(callback){
nomoreschema.find({},callback)
}
nomoreModel.prototype.getById=function(req,callback){

nomoreschema.find({_id:req.params._id},callback)
}
nomoreModel.prototype.update=function(req,callback){

nomoreschema.update({_id:req.params.id},{$set:req.body},callback)
}
module.exports =nomoreModel