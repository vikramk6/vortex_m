
homecontentschema =require('./schemas/HomeCategoriesSchema')
 finalContentSchema = require('./schemas/finalContentSchema');
 var SubCategoriesSchema = require('./schemas/SubCategoriesSchema');
var ObjectId = require('mongoose').Types.ObjectId;
var CategoriesSchema = require('./schemas/CategoriesSchema'),
mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    //ObjectId = Schema.ObjectId;



function CategoriesModel() {
   
}

CategoriesModel.prototype.create = function (req, callback) {
   CategoriesSchema.create(req, callback);
}

CategoriesModel.prototype.getById = function (req, callback) {
   CategoriesSchema.find({_id: req.category_id}, callback);
}

CategoriesModel.prototype.getAllCategories = function (req, callback) {
    CategoriesSchema.find({}, callback)
 
}


CategoriesModel.prototype.getdescription=function(data,callback){

SubCategoriesSchema.aggregate([{$match:{category_id:ObjectId(data._id)}},{
        $lookup: {
            from: 'final_category_descriptions',
            localField: '_id',
            foreignField: 'trementsub_id',
            as: 'description'
        } 
        },{
        $lookup: {
            from: 'questionares',
            localField: '_id',
            foreignField: 'sub_category_id',
            as: 'questionares_data'
        } 
        }],callback)
}

CategoriesModel.prototype.subcatgiries=function(data,callback){
SubCategoriesSchema.find({category_id:ObjectId(data._id)},callback)
}
CategoriesModel.prototype.update = function (req, callback) {
    CategoriesSchema.update({_id: req.params.id}, req.body,{ multi: true },callback)
}

CategoriesModel.prototype.remove = function (req, callback) {
    CategoriesSchema.remove({ _id: req.params.id }, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Successfully deleted", response: data })
        }
    });
};
CategoriesModel.prototype.gettrementlinkdata =function(req,callback){
SubCategoriesSchema.aggregate([{$match:{category_id:ObjectId(data._id)}},{
        $lookup: {
            from: 'final_category_descriptions',
            localField: '_id',
            foreignField: 'sub_category_id',
            as: 'description'
        } 
        }
        ],callback)
}
CategoriesModel.prototype.getcontentlink=function(data,callback){

homecontentschema.aggregate([{$match:{$and:[{trementcat_id:ObjectId(data.trementcat_id)},{trementsub_id:ObjectId(data.trementsub_id)}]}},
 {
        $lookup: {
            from: 'categories',
            localField: 'trementcat_id',
            foreignField: '_id',
            as: 'category_data'
        } 
        },{
        $lookup: {
            from: 'sub_categories',
            localField: 'trementsub_id',
            foreignField: '_id',
            as: 'subcategoriesdata'
        } 
        }],callback)
}
module.exports = CategoriesModel;