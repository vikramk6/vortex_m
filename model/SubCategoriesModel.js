
var SubCategoriesSchema = require('./schemas/SubCategoriesSchema'),
mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;



function SubCategoriesModel() {
   
}

SubCategoriesModel.prototype.create = function (req, callback) {
    SubCategoriesSchema.create(req, callback)
}

SubCategoriesModel.prototype.getById = function (req, callback) {
   SubCategoriesSchema.find({_id: req.subcategory_id}, callback);
}

SubCategoriesModel.prototype.getAllSubCategories = function (req, callback) {
    SubCategoriesSchema.find({}, callback)
}

SubCategoriesModel.prototype.update = function (req, callback) {
    SubCategoriesSchema.update({_id: req.params.id}, req.body,{ multi: true },callback)
}

SubCategoriesModel.prototype.remove = function (req, callback) {
    SubCategoriesSchema.remove({ _id: req.params.id }, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Successfully deleted", response: data })
        }
    });
};

module.exports = SubCategoriesModel;