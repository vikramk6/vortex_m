var UnAvailableDatesSchema = require('./schemas/UnAvailableDatesSchema');


function UnAvailabilityModel() {
    this.UnAvailable = UnAvailableDatesSchema;
}

UnAvailabilityModel.prototype.create = function (req, callback) {
    var _self = this;
    _self.findOneDate(req, function (bookErr, bookDate) {
        if(bookErr) {
             callback({ status: '400', message: "Something Went Wrong", error: bookErr }) 
        } else if(bookDate.length) {
             callback({ status: '400', message: "Already Added This Unavailable Date" })
        } else {
                _self.UnAvailable.create(req.body, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Succesfully added unavailable time slots", response: data })
        }
    });
        }
        
    })

};


UnAvailabilityModel.prototype.getAvailability = function (req, callback) {
    this.UnAvailable.find({doctor_id : req.params.user_id}, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Success", response: data })
        }
    });
};

UnAvailabilityModel.prototype.DetleUnavailableDate = function (req, callback) {
    this.UnAvailable.remove({_id : req.params._id}, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Successfully Deleted", response: data })
        }
    });
};

UnAvailabilityModel.prototype.findOneDate = function (req, callback) {
    this.UnAvailable.find({"date":req.body.date}, callback);
};


module.exports = UnAvailabilityModel;
