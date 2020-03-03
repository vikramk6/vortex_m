
var mongoose = require('mongoose'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    timebookingSchema;


var slotbooking = new Schema({
    user_id: { type: ObjectId },
    booking_slot_date: String,
    booking_slot_time: String,
    doctor_id: {type: ObjectId },
    available: { type: Boolean, default: true },
    purpose:{type : String}
})
timebookingSchema = mongoose.model('slot_booking', slotbooking);
var AvailabilitySchema = require('./schemas/AvailabilitySchema');

var userSchema = require('./schemas/usermodal.js');
function slotBookingModel() {
    this.tbs = timebookingSchema;
}

slotBookingModel.prototype.getAll = function (req, callback) {
    // this.tbs.find({}, callback);
    
        this.tbs.aggregate([
    //         {
    // $match : {"available":true}
    // },
    {
    $match : {"doctor_id":mongoose.Types.ObjectId(req.params.doctor_id)}
    },
        {
    $lookup : {
        from: 'users',
        localField :"user_id",
        foreignField : "_id",
        as:"patient_data"
    }
    }], callback);
    
};

slotBookingModel.prototype.getallrecordes =function(req,callback){
this.tbs.find({}, callback);
}
slotBookingModel.prototype.getuserAppointmnets =function(req,callback){
this.tbs.aggregate([{$match:{user_id:mongoose.Types.ObjectId(req.params.user_id)}},{
    $lookup : {
        from: 'users',
        localField :"user_id",
        foreignField : "_id",
        as:"patient_data"
    }
    }],callback)
}
slotBookingModel.prototype.get = function (req, callback) {
    this.tbs.find({ user_id: req.params.user_id }, callback);
};
slotBookingModel.prototype.getId = function (req, callback) {
    this.tbs.findOne({ _id: req.params.id }, callback);
};

slotBookingModel.prototype.create = function (req, callback) {
    this.tbs.create(req.body, function (err, data) {
    console.log("err,data",err,data)
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Success", response: data })
        }
    });
};

slotBookingModel.prototype.update = function (req, callback) {
    this.tbs.update({ _id: req.params.id }, req.body, { multi: true }, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Success", response: data })
        }
    })
};

slotBookingModel.prototype.remove = function (req, callback) {
    this.tbs.remove({ _id: req.params.id }, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Success", response: data })
        }
    });
};
slotBookingModel.prototype.updteavilable =function(data,callback){
 this.tbs.update({_id:data._id},{$set:{available:false}},callback)
}
slotBookingModel.prototype.findsoltanddate=function(data,callback){

this.tbs.find({$and:[{booking_slot_time:data.booking_slot_time},{booking_slot_date:data.booking_slot_date}]},callback)
}
slotBookingModel.prototype.slotdates=function(data,callback){
this.tbs.find({booking_slot_date:data.date},callback)
}
slotBookingModel.prototype.finduserdetailes=function(data,callback){

userSchema.find({$or:[{_id:data.response.user_id},{_id:data.response.doctor_id}]},callback)
}
slotBookingModel.prototype.findslots=function(callback){

AvailabilitySchema.find({},callback)
}
module.exports = slotBookingModel;