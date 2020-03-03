var AvailabilityModel = require('../model/AvailabilityModel'),
doctormodel = require('../model/schemas/usermodal'),
 moment = require('moment');
 var _ = require('lodash');

function AvailabilityController() {
    availableModel = new AvailabilityModel();
   // this.doctormodel = new doctormodel();
}

AvailabilityController.prototype.create = function (req, res, next) {

    if (!req.body.doctor_id) {
        res.status(200).json({ status: '404', message: "Please provide doctor_id" });
    } else if (!req.body.start_slot) {
          res.status(200).json({ status: '404', message: "Please provide start_slot" });
    } else if (!req.body.end_slot) {
          res.status(200).json({ status: '404', message: "Please provide end_slot" });
    
    } else {
         let array = [], obj, _self = this;
        // let length = req.body.end_slot - req.body.start_slot;// 10 - 16
        // for(var i= parseInt(req.body.start_slot); i<= parseInt(req.body.end_slot); i++) {
        //     if(i === parseInt(req.body.end_slot)) {
        //         req.body.time_slots = array;
        //             let _self = this, obj = {} ;
        // availableModel.create(req, function (cdata) {
        //           res.status(200).json(cdata); 
        // });
        //     } else {
        //         obj = i +' - '+ (parseInt(i+1));
        //         array.push(obj);
        //     }
        // }
           
        intervals(req.body.start_slot, req.body.end_slot, function (intervals) {

            
            if(intervals) {
                req.body.time_slots = intervals;
                req.body.timeSlots = intervals;
                  availableModel.create(req, function (cdata) {
                  res.status(200).json(cdata); 
        });
            } else {
                  availableModel.create(req, function (cdata) {
                  res.status(200).json(cdata); 
        });
            }
            
        });
      
     
       
    }
};

function intervals(startString, endString, callabck) {

    var start = moment(startString, 'hh:mm a');
    var end = moment(endString, 'hh:mm a');

    // round starting minutes up to nearest 15 (12 --> 15, 17 --> 30)
    // note that 59 will round up to 60, and moment.js handles that correctly
    start.minutes(Math.ceil(start.minutes() / 30) * 30);

    var result = [];

    var current = moment(start);
  
    while (current <= end) {
        result.push({slot:current.format('HH:mm')});

        current.add(30, 'minutes');
    }

    callabck(result);
}


AvailabilityController.prototype.getAvailability = function (req, res, next) {
     availableModel.getAvailability(req, function (cdata) {
                  res.status(200).json(cdata); 
        });
}

AvailabilityController.prototype.findDoctors = function (req, res) {
    doctormodel.find({ userType: 'doctor' }, function(err,result)
    {
        if(err)
        {
             res.status(400).json({"status": 400, "err_field": "", "message": "something wentwrong please try agin" + err }); 
            //  cb(err,{"status": 400, "err_field": "", "message": "something wentwrong please try agin" + err });
            
        }else
        {
             res.status(200).json({"status": 200, "message": "Success" , response : result }); 
            //cb("",{"status": 200, "message": "Proceed to next","data":result});
            
        }
    })
}


// AvailabilityController.prototype.findDoctorsNReception = function (req, res) {
//     let final_response = [];
//     doctormodel.find({ userType: 'doctor' }, function(err,result) {
//         if(err) {
//              res.status(400).json({"status": 400, "err_field": "", "message": "something wentwrong please try agin" + err }); 
//         } else {
//             var obj ={}
//             result.map(function (value, index) {
//                  var obj ={
//                      doctor_details : value,
//                      reception_details : {}
//                  };
//                  doctormodel.find({ userId: value._id }, function(d_err,d_result) {
//                      obj.reception_details = d_result[0]
//                      final_response.push(obj);
//                      if(result.length === final_response.length) {
//                         res.status(200).json({"status": 200, "message": "Success" , response : final_response });   
//                      }
//                  })
//             })
//         }
//     })
// }

AvailabilityController.prototype.findDoctorsNReception = function (req, res) {
    let final_response = [];
    doctormodel.find({ userType: 'doctor' }, function(err,result) {
        if(err) {
             res.status(400).json({"status": 400, "err_field": "", "message": "something wentwrong please try agin" + err }); 
        } else {
            var obj ={}
            result.map(function (value, index) {
                 var obj ={
                     doctor_details : [],
                     reception_details : []
                 };
                 obj.doctor_details.push(value);
                 doctormodel.find({ userId: value._id }, function(d_err,d_result) {
                     obj.reception_details = [...d_result];
                     final_response.push(obj);
                     if(result.length === final_response.length) {
                        res.status(200).json({"status": 200, "message": "Success" , response : final_response });   
                     }
                 })
            })
        }
    })
}
 function mounth(data,callback){
  availableModel.mounthwisedatesdata(data,(err,response)=>{

  callback(err,response,data)
  
  })
 }
AvailabilityController.prototype.mounthwisedates=function(req,res){
var startDateString = new Date();
var year = startDateString.getFullYear();
var month = startDateString.getMonth();
var day = startDateString.getDate();
var c = new Date(year + 1, month, day)
var endDateString = new Date(c);
var startingDate = new Date(year,month,day)
var startDate = moment(startingDate, "YYYY-MM-DD");
var endDate = moment(endDateString, "YYYY-MM-DD").endOf("month");

var allMonthsInPeriod = [];var arr = [];

while (startDate.isBefore(endDate)) {

allMonthsInPeriod.push({date:startDate.format("YYYY-MM"),mounth:startDate.format("MMMM"),year:startDate.format("YYYY"),mou:startDate.format("MM")});
startDate = startDate.add(1, "month");
};


for(var  i=0;i< allMonthsInPeriod.length;i++){
mounth(allMonthsInPeriod[i],function(err,response,data){

if(response && response.length){
data.status = true
arr.push(data);
}else{
data.status = false
arr.push(data);
}
arr.sort((a,b)=>{

    let date1 = new Date(a.date);
    
    let date2 = new Date(b.date);
  return date1-date2
})
if(arr.length == allMonthsInPeriod.length){
res.status(200).json({"status":200,"err_fiesld":"","message":"success","result":arr})
}

})
}



}
AvailabilityController.prototype.mouthdates=function(req,res){
availableModel.mounthwisedates(req.body,(err,response)=>{
if(err){
res.status(200).json({"status":400,"err_field":"something went to worng","result":""})
}else{
res.status(200).json({"status":200,"err_field":"","result":response,"message":"success"})
}
})
}
AvailabilityController.prototype.realsemouths=function(req,res){
availableModel.realsemouths(req.body,function(err,response){
if(err){
res.status(200).json({"status":400,"err_field":"something went to worng","result":""})
}else{
res.status(200).json({"status":200,"err_field":"","result":response,message:"success"})
}
})
}
AvailabilityController.prototype.mouthwisedates=function(req,res){
availableModel.mouthwisedates(req.body,function(err,response){

if(err){
res.status(200).json({"status":400,"err_field":"something went to worng","result":""})
}else{
res.status(200).json({"status":200,"err_field":"","result":response,message:response})
}
})
}
 function mounthsdata(data,callback){
  availableModel.mouthwisedates(data,(err,response)=>{

  callback(err,response,data)
  
  })
 }
AvailabilityController.prototype.relesemouthdates=function(req,res){
var arr=[],finalarray=[];

availableModel.relesemouthdates((err,result)=>{

for(var i=0;i< result.length;i++){

mounthsdata(result[i],function(err,response,data){
console.log("response",response)
var obj = {};
if(data){

obj._id =data._id  ;
obj.mou =data.mou ;
obj.year=data.year;
obj.status =data.status ;
obj .dates= response;


finalarray.push(obj);

if(result.length == finalarray.length){

res.status(200).json({"status":200,"err_fiesld":"","message":"success","result":finalarray})
}
}

})
}

})
}
module.exports = AvailabilityController;