var doctorSchema = require('./schemas/usermodal');

function DoctorsModel() {
   
}

DoctorsModel.prototype.getDoctorsByClinicId = function (req, callback) {
    doctorSchema.find({"userId":req.clinic_id}, callback);
};

module.exports = DoctorsModel;