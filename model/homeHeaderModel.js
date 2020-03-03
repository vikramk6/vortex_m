var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    homeHeaderSchema;

var HomeHeader = new Schema({
    home_header: { type: String },
    sub_content_header:{ type: String },
    final_content_header :{ type: String },
    background_image:{ type: String },
    background_color:{ type: String },
    doctor_id : { type: ObjectId },
    created_on:{ type: Date, default: Date.now }
})

homeHeaderSchema = mongoose.model('home_header', HomeHeader);


function HomeHeaderModel() {
    this.hhs = homeHeaderSchema;
}

HomeHeaderModel.prototype.get = function (req, callback) {
    this.hhs.find({}, callback);
};

HomeHeaderModel.prototype.getByDoctorId = function (req, callback) {
    this.hhs.find({doctor_id : req.doctor_id}, callback);
};


HomeHeaderModel.prototype.create = function (req, callback) {
    let _self = this;
    _self.hhs.find({doctor_id : req.body.doctor_id}, function (derr, doc_data) {
        if(doc_data.length) {
            callback({ status: '400', message: "Already headers and background details added for this doctor", response: doc_data })
        } else {
               _self.hhs.create(req.body, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Successfully Added", response: data })
        }
    });
        }
    });
    
 
};

HomeHeaderModel.prototype.update = function (req, callback) {
    this.hhs.update({ _id: req.params.id }, req.body, { multi: true }, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Successfully Updated", response: data })
        }
    })
};

HomeHeaderModel.prototype.remove = function (req, callback) {
    this.hhs.remove({ _id: req.params.id }, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Successfully Deleted", response: data })
        }
    });
};

module.exports = HomeHeaderModel;