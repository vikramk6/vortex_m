var Timebookingmodel = require('../model/timebookingmodel');
 moment = require('moment');
 
const nodemailer = require('nodemailer');
const mailconfig = require('../config/mailconfig');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: mailconfig.forgotMailUsername, // Your email id
        pass: mailconfig.forgotMailPassword // Your password
    }
})
function SlotBookingController() {
    this.scm = new Timebookingmodel();
}
var CronJob = require('cron').CronJob;
new CronJob('* * * * * *', function() {
console.log("hiiiii")
  this.scm.getallrecordes ( function (err, data) {
  
    if (data && data.length) {
    data.forEach((da)=>{
    var bookingdate =new Date(da.booking_slot_date)
    var date =new Date()
    if(bookingdate < date){
    this.scm.updteavilable(da)
    }
    })
    }
  })
  });

SlotBookingController.prototype.getAppointmnets = function (req, res) {
var today = new Date();
var dd = today.getDate()+1;
var mm = today.getMonth()+1
var yyyy = today.getFullYear();
today = yyyy + '-' + mm+ '-' + dd ;
d1= Date.parse(today )

this.scm.getAll(req, function (err, data) {
if (data && data.length) {
 data.forEach((da,index)=>{
 var d2=Date.parse(da.booking_slot_date)
if(d1>d2){

da.available=false
 if(index+1==data.length){

 res.status(200).json({ status: 200, message: "Success", appointments: data });
 }
    }else{
    if(index+1==data.length){

 res.status(200).json({ status: 200, message: "Success", appointments: data });
 }
    }
    })
} else {
            res.status(200).json({ status: 400, message: "No records found" });
        }
    });
};
SlotBookingController.prototype.getuserAppointmnets = function (req, res) {
this.scm.getuserAppointmnets (req,function (err, data) {
if (data && data.length) {
            res.status(200).json({ status: 200, message: "Success", appointments: data });
        } else {
            res.status(200).json({ status: 400, message: "No records found" });
        }
  })
}
SlotBookingController.prototype.getAllByUserId = function (req, res) {
    this.scm.get(req, function (err, data) {
        if (data && data.length) {
            res.status(200).json({ status: 200, message: "Success", sub_content: data });
        } else {
            res.status(200).json({ status: 400, message: "No records found" });
        }
    });
};

SlotBookingController.prototype.getId = function (req, res) {
    this.scm.getId(req, function (err, data) {
        if (data) {
            res.status(200).json({status:200, message:"suucess", response :data});
        } else {
            res.status(200).json({ status: 400, message: "No records found" });
        }
    });
};

SlotBookingController.prototype.create = function (req, res, next) {
    if (!req.body.user_id) {
        res.status(400).json({ status: '400', message: "Please provide user_id" });
    } else if (!req.body.booking_slot_time) {
        res.status(400).json({ status: '400', message: "Please provide booking_slot_time" });
    } else if (!req.body.booking_slot_date) {
        res.status(400).json({ status: '400', message: "Please provide booking_slot_date" });
    } else {
        let _self = this
        _self.scm.findsoltanddate(req.body,function(err,data){
    
        if(data&&data.length>0){
        res.status(200).json({"status":400,"err_field":"this slot already used anther user",result:""})
        }else{
        _self.scm.create(req, function (cdata) {
        if(cdata){
          _self.scm.finduserdetailes(cdata,(err,data)=>{
          if(data){
          console.log("data.....",data)
                                                    var mailOptions = {
                                        from: '"VORTEX"<versatilemobitech1@gmail.com>', // sender address
                                       to: 'vikram@healthx.se', // list of receivers
                                        subject: 'Slot Booking Request', // Subject line
                                        text: "Slot  Booking Detailes", // plaintext body
                                        html: 'Slot Booking User name' + '&nbsp;  <b>' + data[0].fullname+ '</b> </br> Slot Booking Date '+ '&nbsp; <b>'+req.body.booking_slot_date+'</b> </br> Slot Booking Time '+ '&nbsp;<b>'+req.body.booking_slot_time+'</b>' // You can choose to send an HTML
                                   };
                                    transporter.sendMail(mailOptions, function (err, data) {
                                        if (err) {
                                            res.status(200).json({ status: 400, err_field: "Something went wrong" });
                                        }
                                        else {
                                           console.log(data);

                                       res.status(201).json(cdata);
                                       
                                       }
               
                                    })
               }
           })
          }
        })
        
}
})
}
}

SlotBookingController.prototype.update = function (req, res, next) {
    let _self = this;
    this.scm.update(req, function (data) {
        res.status(200).json(data);
    });

};

SlotBookingController.prototype.remove = function (req, res, next) {
    this.scm.remove(req, function (data) {
        res.status(204).json(data);
    });
};
SlotBookingController.prototype.slotdates=function(req,res,nest){
var obj={}
this.scm.findslots((err,data)=>{
obj.slots=data
if(data){
this.scm.slotdates(req.body,(err,response)=>{
obj.bookingdates=response
if(err){
res.status(200).json({"status":"400","err_field":"something went to worng","result":""})
}else{
res.status(200).json({"status":"200","err_field":"","result":obj})
}

})
}
})
}
var stripe = require('stripe')("sk_test_RWZBmUHV4Ib66jnV35uaCF5N00oPHySZbE");
SlotBookingController.prototype.charge=function (req,res){
var amount=200;
  let _self = this;
	console.log(req.body);
stripe.customers.create({
     email: req.body.stripeEmail,
     source: req.body.stripeToken,
	 
	 
  },function(err,customer){
  	if(err){
  	res.send("customer error"+err);
  	}else{
	 stripe.charges.create({
			amount:parseFloat(amount)*100,
			currency: "SEK",
			customer: customer.id
	  },function(err,charge){
		  if(err)
		  {
			 res.status(200).json({"status":"400","err_field":"payment failed,please try again","message":"payment failed,please try again","result":""})
			  
		  }else{
		  	 _self.scm.create(req, function (cdata) {
        if(cdata){
          _self.scm.finduserdetailes(cdata,(err,data)=>{
          if(data){
          console.log("data.....",data)
                                                    var mailOptions = {
                                        from: '"VORTEX"<versatilemobitech1@gmail.com>', // sender address
                                       to: 'vikram@healthx.se', // list of receivers
                                        subject: 'Slot Booking Request', // Subject line
                                        text: "Slot  Booking Detailes", // plaintext body
                                        html: 'Slot Booking User name' + '&nbsp;  <b>' + data[0].fullname+ '</b> </br> Slot Booking Date '+ '&nbsp; <b>'+req.body.booking_slot_date+'</b> </br> Slot Booking Time '+ '&nbsp;<b>'+req.body.booking_slot_time+'</b>' // You can choose to send an HTML
                                   };
                                    transporter.sendMail(mailOptions, function (err, data) {
                                        if (err) {
                                            res.status(200).json({ status: 400, err_field: "Something went wrong" });
                                        }
                                        else {
                                           
                                          res.status(200).json({"status":"200","err_field":"","result":cdata,"meassage":"your payment processed successfully,your slot conform"})
                                      
                                       
                                       }
               
                                    })
               }
           })
          }
        })
		  	
		  }
	})
  	}
  	
  })

}
module.exports = SlotBookingController