var mongoose=require('mongoose')
var Schema=mongoose.Schema;
var  realsemouth=new Schema({
mou:{type:String},
status:{type:String},
year:{type:String},
created:{ type:Date},
 created_on: { type: Date, default: Date.now }
})
Realsemouth=mongoose.model('realsemouth',realsemouth)
module.exports=Realsemouth
