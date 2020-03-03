var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    UnAvailableDatesSchema;

var unavailable_dates = new Schema({
    doctor_id: {type : ObjectId},
    time : {type : String},
    date:{type : String },
    description: { type: String },
    created:{ type: Date},
    created_on: { type: Date, default: Date.now }
})




module.exports = UnAvailableDatesSchema = mongoose.model('unavailable_dates', unavailable_dates);