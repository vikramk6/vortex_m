var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    homeCategoriesSchema,
    ObjectId = Schema.ObjectId;

var final_category_description = new Schema({
    category_id: { type: ObjectId },
    sub_category_id : { type: ObjectId },
     trementcat_id:Schema.Types.ObjectId,
    trementsub_id:Schema.Types.ObjectId,
  information_id: { type: ObjectId },
    logo: { type: String ,  default: ''},
    heading : { type: String ,  default: ''},
    description : { type: String ,  default: ''},
    link : { type: String ,  default: '' },
})

module.exports = homeCategoriesSchema = mongoose.model('final_category_description', final_category_description);

