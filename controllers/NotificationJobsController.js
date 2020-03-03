var JobsModel = require('../model/NotificationJobsModel'),
    jm = new JobsModel();

function JobsController() {
}
JobsController.prototype.getAll = function (req, res) {
    jm.get(function (err, result) {
        if (err) {
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            console.log(err, result)
            if (result && result.length) {
                res.status(200).json({ success: 200, message: "Success", data: result });
            } else {
                res.status(404).json({ success: 200, message: "Success", data: "No records found" });
            }
        }
    });
};

module.exports = JobsController;