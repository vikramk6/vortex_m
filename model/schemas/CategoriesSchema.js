var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    CategoriesSchema;

var Categories = new Schema({
    category_name: { type: String ,  default: ''},
    image:{ type: String ,  default: ''},
    created_on: { type: Date, default: Date.now }
})

module.exports = CategoriesSchema = mongoose.model('categories', Categories);

