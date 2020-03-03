var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    nomoreSchema,
    ObjectId = Schema.ObjectId;

var nomore= new Schema({
 paragraph:String,
  created_on:{type: Date, default: Date.now}
})

module.exports = nomoreSchema= mongoose.model('nomore', nomore);