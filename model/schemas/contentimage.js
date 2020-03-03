var mongoose = require('mongoose')
var Schema = mongoose.Schema
var  contentimage = new Schema({
  category_id :Schema.Types.ObjectId,
  subcategry_id:Schema.Types.ObjectId,
    image: String,
    content:String,
    paragraph: String,
    type:String,
    created_on:{type: Date, default: Date.now}
   })
var contentimageschema= mongoose.model('contentimage',contentimage )
module.exports = contentimageschema