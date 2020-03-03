var AvailabilitySchema = require('./schemas/AvailabilitySchema'),
moment = require('moment');
var UnAvailableDatesSchema =require('./schemas/UnAvailableDatesSchema.js')
var realsemouths=require('./schemas/releasemouthSchema.js')

function AvailabilityModel() {
    this.availability = AvailabilitySchema;
}

AvailabilityModel.prototype.create = function (req, callback) {
    
    let _self = this;
         _self.getAvailability({doctor_id : req.body.doctor_id}, function (res) {
             console.log(res.status, res.response.length);
             if(!res.response.length) {
                  _self.availability.create(req.body, function (err, data) {
   
        if (err) {
            callback({ status: '400', message: "Something went wrong" ,err :err})
        } else {
            callback({ status: '200', message: "Succesfully added available time slots", response: data })
        }
    });
             } else {
                       _self.availability.update(req.body, function (err, data) {

        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: " Time Slots Succesfully Updated ", response: data })
        }
    });
             }
            
        })
   
};


AvailabilityModel.prototype.getAvailability = function (req, callback) {
    var user_id;
    if(req.params && req.params.doctor_id) {
        user_id = req.params.doctor_id
    } else if(req.doctor_id) {
         user_id = req.doctor_id
    }
    this.availability.find({doctor_id : user_id}, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else if(data.length) {
           
            callback({ status: '200', message: "Success", response: data })
        } else {
              callback({ status: '400', message: "No Data Found", response: data })
        }
    });
};


AvailabilityModel.prototype.mounthwisedatesdata=function(data,callback){

var number= Number(data.year)
var mounth=Number(data.mou)
//console.log("nnnn,mmm",number,mounth)
//console.log("([{ "$project": {"year":{"$year":"$created"},"month":{"$month":"$created"}}},{ "$match":{"year" :data.year, "month":data.mou}}],callback)")
realsemouths.aggregate([{ "$project":{"year":{"$year":"$created"},"month":{"$month":"$created"}}},{ "$match":{"year" :number, "month":mounth}}],callback)
}
//AvailabilityModel.prototype.mouthdates=function(data,callback){
//UnAvailableDatesSchema.aggregate([{ "$project": {date:1,doctor_id:1,created:1,created_on:1,"year":{"$year":"$created"},"month":{"$month":"$created"}}},{ "$match":{"month":data.mounth}}],callback)
//}
AvailabilityModel.prototype.realsemouths=function(data,callback){
var relase=new realsemouths(data)
relase.save(relase,callback)
}
AvailabilityModel.prototype.mouthwisedates=function(data,callback){
var number= Number(data.year)
var mounth=Number(data.mou)
UnAvailableDatesSchema .aggregate([{ "$project": {date:1,doctor_id:1,created:1,created_on:1,"year":{"$year":"$created"},"month":{"$month":"$created"}}},{ "$match":{"year" :number, "month":mounth}}],callback)
}
AvailabilityModel.prototype.relesemouthdates=function(callback){

realsemouths.find({status:"realise"},callback)

}
module.exports = AvailabilityModel;
