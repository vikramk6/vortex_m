var request = require('request'),
    nodemailer = require('nodemailer'),
    config = require('../../config/config.json'),
    mailconfig = require('../../config/mailconfig'),
    moment = require('moment');
    transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: mailconfig.forgotMailUsername, // Your email id
            pass: mailconfig.forgotMailPassword // Your password
        }
    });

module.exports = {
    execute: () => {
     startTime = function() {
             var today = new Date();
            // var h = today.getHours();
            // var m = today.getMinutes();
            // return h + ":" + m;
            console.log("cuureeent time",moment(today), moment(today).format("HH:mm"), moment(today).add(2, 'hours').format('HH:mm'));
            return moment(today).add(1, 'hours').format('HH:mm');
        }
       var oneHourBeforeTime = startTime();
       
         //oneHourBeforeTime = moment(new Date()).add(2, 'hours').format('HH:mm');
        request("http://192.169.243.70:5004/contents/slot/users/appointments/5be40fed50b922569edd3946", function (error, response, body) {
            var response = JSON.parse(body);
            response.appointments.forEach(function (appointment) {
                  console.log("oneHourBeforeTime  ", oneHourBeforeTime);
                if (appointment.booking_slot_time) {
                    console.log(appointment.booking_slot_time, oneHourBeforeTime);
                    
                    if (appointment.booking_slot_time == oneHourBeforeTime) {
                        console.log("inside  appointment  ", appointment);
                        request('http://192.169.243.70:5004/users/view/' + appointment.user_id, function (error, response, body) {

                            console.log("User data ", JSON.parse(body).result);
                            var userData = JSON.parse(body).result,
                                html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><title>Vortex</title><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"></head><style>.welcome h3{color: #ffae24;font-size: 24px;}.welcome a{text-decoration:underline;color:#1c0b7d;}.welcome{border: 2px solid #1c0b7d;padding: 17px;margin: 12px;}</style><body><div class="container-fluid"><div class="container"><div class="row "><div class="col-lg-4 welcome" style="border: 2px solid #1c0b7d;padding: 17px;margin: 12px;"><div class="row"><div class="col-lg-3"><img src="../logo.png"></div><div class="col-lg-9 mt-5" ><h2>Vortex</h2></div></div><div class="row  mt-3"><div class="col-lg-12 text-center"><h3 style="color: #ffae24;font-size: 24px;">Welcome To Vortex</h3><a style="text-decoration: underline;color: #1c0b7d;" href="http://fansadda.mobi/" target="blank">http://fansadda.mobi/</a></div></div></div></div></div></div></body></html>';
                            var mailOptions = {
                                from: '"VORTEX"<versatilemobitech@gmail.com>', // sender address
                                to: 'srijyothin.versatilemobitech@gmail.com',//userData.email, // list of receivers
                                subject: "Don't forget to attend your appointment scheduled for next hour", // Subject line
                                html: html // You can choose to send an HTML
                            };

                            transporter.sendMail(mailOptions, function (err, data) {
                                if (err) {
                                    console.log("error  ", err);
                                }
                                else {
                                    console.log("Mail sent successfully  ", data);
                                }   
                            });
                        });
                    }
                }
            });
        });
    }
};