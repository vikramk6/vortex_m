var Doctormodel = require('../model/DoctorsListModel'), dm;


function DoctorsListController() {
    dm = new Doctormodel()
}

DoctorsListController.prototype.getDoctorsByClinicId = function (req, res) {
    dm.getDoctorsByClinicId(req.params, function (err, data) {
        if(err) {
            res.status(200).json({status:200, "response":data, message:"Something went wrong"});
        } else if (data && data.length) {
               res.status(200).json({status:200, "response":data, message:"Success"});
        } else {
            res.status(200).json({status:200, "response":data, message:"No Doctors Found With Respect To This Clinic"}); 
        }
    })
    
}





module.exports = DoctorsListController;