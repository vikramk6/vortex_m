var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    notificationJobsSchema = new Schema({
        name: String,
        module: String,
        description: String,
        product_line: String,
        active: Boolean,
        schedule: Object
    });

var notificationsModel = mongoose.model('notification_jobs', notificationJobsSchema);

module.exports = notificationsModel;

function JobsModel() {

}

JobsModel.prototype.get = function(callback) {
   notificationsModel.find({active:true}, callback);
}

module.exports  = JobsModel;