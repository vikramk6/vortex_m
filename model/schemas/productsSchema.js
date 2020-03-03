var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    productsSchema;

var products = new Schema({
    product_name: { type: String },
    product_image: { type: String },
    description: { type: String },
    product_price: { type: Number },
    sku : { type: String },
    created_on: { type: Date, default: Date.now }
})

var productsSchema = mongoose.model('products', products);
module.exports =productsSchema;