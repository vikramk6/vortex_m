var mongoose = require('mongoose')
var Schema = mongoose.Schema
var  contentlink= new Schema({
    category_id:Schema.Types.ObjectId,
    subcategry_id: Schema.Types.ObjectId,
    title:String,
   created_on:{type: Date, default: Date.now}
   })
var contentlinkschema= mongoose.model('contentlink', contentlink)
module.exports = contentlinkschema