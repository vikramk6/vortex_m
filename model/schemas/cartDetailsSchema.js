var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    cartSchema;

var product = new Schema({
    product_name: { type: String },
    product_image: { type: String },
    description: { type: String },
    product_price: { type: Number },
})


var cart_details = new Schema({
    product_id: Object,
    user_id: Object,
    quantity: { type: Number, default: 1 },
    created_on: { type: Date, default: Date.now },
    product_name: { type: String },
    product_image: { type: String },
    description: { type: String },
    product_price: { type: Number }
})




module.exports = cartSchema = mongoose.model('cart_details', cart_details);