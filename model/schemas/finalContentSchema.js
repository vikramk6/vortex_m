var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    finalContentSchema;

var finalContent = new Schema({
    content_id: Schema.Types.ObjectId,
    sub_content_id: Schema.Types.ObjectId,
    trementcat_id:Schema.Types.ObjectId,
    trementsub_id:Schema.Types.ObjectId,
    section_name: {
        type: String,
        default: ''
    },
    section_image: {
        type: String,
    },
    section_text: {
        type: String,
        default: ''
    },
    link: { type: String },
    background_image:{ type: String },
    background_color:{ type: String },
    treatment: {type : Boolean, default: false}
})
module.exports = finalContentSchema = mongoose.model('final-content', finalContent);