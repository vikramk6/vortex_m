var mongoose = require('mongoose')
var Schema = mongoose.Schema
var  contentparagrap = new Schema({
    subcategry_id: Schema.Types.ObjectId,
    category_id:Schema.Types.ObjectId,
    paragraph: String,
    created_on:{type: Date, default: Date.now}
   })
var contentparagrapschema= mongoose.model('contentparagrap', contentparagrap)
module.exports = contentparagrapschema