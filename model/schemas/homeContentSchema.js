var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    homeContentSchema;

var homeContent = new Schema({
    content_name: { type: String },
    content_image: { type: String },
    content_text: { type: String },
    background_image:{ type: String },
    link:{ type: String },
    background_color:{ type: String }
})

module.exports = homeContentSchema = mongoose.model('homeContent', homeContent);
