var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    SubCategoriesSchema;

var sub_categories = new Schema({
    category_id : { type : ObjectId },
    sub_category_name: { type: String ,  default: ''},
    created_on: { type: Date, default: Date.now }
})

module.exports = SubCategoriesSchema = mongoose.model('sub_categories', sub_categories);

