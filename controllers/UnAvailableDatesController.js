var UnAvailabilityModel = require('../model/UnAvailableDatesModel'),
doctormodel = require('../model/usermodal');

function UnAvailabilityController() {
    this.unAvailableModel = new UnAvailabilityModel();
   // this.doctormodel = new doctormodel();
}

UnAvailabilityController.prototype.create = function (req, res, next) {
    if (!req.body.doctor_id) {
        res.status(200).json({ status: '404', message: "Please provide doctor_id" });
    } else if (!req.body.date) {
          res.status(200).json({ status: '404', message: "Please provide date" });
    
    } else {
         this.unAvailableModel.create(req, function (cdata) {
                  res.status(200).json(cdata); 
        });
    }
};

UnAvailabilityController.prototype.getAvailability = function (req, res, next) {
     this.unAvailableModel.getAvailability(req, function (cdata) {
                  res.status(200).json(cdata); 
        });
}


UnAvailabilityController.prototype.DetleUnavailableDate = function (req, res, next) {
     this.unAvailableModel.DetleUnavailableDate(req, function (cdata) {
                  res.status(200).json(cdata); 
        });
}






module.exports = UnAvailabilityController;