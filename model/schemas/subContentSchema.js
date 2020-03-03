var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
     ObjectId = Schema.ObjectId,
    subContentSchema;

var subContent = new Schema({
    content_id: { type: ObjectId },
    sub_content_name: {
        type: String,
        default: ''
    },
    sub_content_image: {
        type: String,
    },
    sub_content_text: {
        type: String,
        default: ''
    },
    link: { type: String },
    background_image:{ type: String },
    background_color:{ type: String }
})
module.exports = subContentSchema = mongoose.model('subContent', subContent);