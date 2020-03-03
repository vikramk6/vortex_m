var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    AvailabilitySchema;
 var ObjectId = Schema.ObjectId;
var timeSlots = new Schema({
 slot : {type: String }

});
var doctor_availability = new Schema({
    doctor_id: {type: ObjectId },
    created_on: { type: Date, default: Date.now },
    start_slot: { type: String },
    end_slot: { type: String },
     time_slots :  [timeSlots],
    description: { type: String }
})




module.exports = AvailabilitySchema = mongoose.model('doctor_availability', doctor_availability);