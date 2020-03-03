var trementcatagiries = require('./schemas/CategoriesSchema.js');
var trementsubcatagiries =require('./schemas/SubCategoriesSchema.js');
var homeContentSchema = require('./schemas/homeContentSchema');
var subContentSchema = require('./schemas/subContentSchema');
var contentparagrap = require('./schemas/contentpragraph');
var contentimage = require('./schemas/contentimage');
var contentlinkschema = require('./schemas/contentlink.js');

var ObjectId = require('mongoose').Types.ObjectId;
function HomeContentModel() {
    this.hcm = homeContentSchema;
}

HomeContentModel.prototype.get = function (req, callback) {
    this.hcm.find({}, callback);
};
HomeContentModel.prototype.getId = function (req, callback) {
    this.hcm.findOne({ _id: req.params.id }, callback);
};
HomeContentModel.prototype.subcontentdata =function(data,callback){

subContentSchema.find({content_id:ObjectId(data._id)},callback)
}

HomeContentModel.prototype.create = function (req, callback) {
    this.hcm.create(req.body, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Success", response: data })
        }
    });
};

HomeContentModel.prototype.update = function (req, callback) {
    this.hcm.update({ _id: req.params.id }, req.body, { multi: true }, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Success", response: data })
        }
    })
};

HomeContentModel.prototype.remove = function (req, callback) {
   contentimage.remove({ _id: req.params.id }, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Successfully deleted", response: data })
        }
    });
};
HomeContentModel.prototype.removecontent = function (req, callback) {
   this.hcm.remove({ _id: req.params.id }, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Successfully deleted", response: data })
        }
    });
};

HomeContentModel.prototype.aggregate = function (req, callback) {
homeContentSchema.find({},callback)
};
HomeContentModel.prototype.subcatdata=function(data,callback){
console.log ("datacxzvvzv",data)

subContentSchema.aggregate([{$match:{content_id:ObjectId(data._id)}},
   {
        $lookup: {
        from:'contentlinks',
        localField:'_id',
        foreignField:'subcategry_id',
        as:'contentpagination'
        }
        }, {
        $lookup: {
            from: 'contentimages',
            localField: '_id',
            foreignField: 'subcategry_id',
            as: 'contentparagrap'
        }
        }
    ],function(err,response){
    callback(err,response,data)
    })
}
HomeContentModel.prototype.savecontentparagraph=function(data,callback){
   var cp= new contentparagrap (data)
   cp.save(cp,callback)
}
HomeContentModel.prototype.deletecontentparagraph=function(data,callback){
contentparagrap.remove({_id:data.id},callback)
}
HomeContentModel.prototype.updateparagrah=function(data,callback){

contentparagrap.update({_id:data.id},{$set:data},callback)
}
HomeContentModel.prototype.savecontentimage=function(data,callback){

 var ci= new contentimage(data)
   ci.save(ci,callback)
}
HomeContentModel.prototype.deletecontentimage=function(data,callback){
contentimage.remove({_id:data.id},callback)
}
HomeContentModel.prototype.updatecontentimage=function(data,callback){

contentimage.update({_id:data.id},{$set:data},callback)
}
HomeContentModel.prototype.contentlink=function(data,callback){
var cl =new contentlinkschema (data)
cl.save(cl,callback)
}
HomeContentModel.prototype.getcatagiries=function(callback){
trementcatagiries .find({},callback)
}
HomeContentModel.prototype.gettrementcatagiries=function(callback){
homeContentSchema .find({},callback)
}
HomeContentModel.prototype.gelinkcontentdata=function(data,callback){
contentlinkschema.find()
}
HomeContentModel.prototype.findsubcatids=function(data,callback){
contentlinkschema.find({$and:[{treament_catagity:ObjectId(data.treament_catagity)},{trement_subcatagiry:ObjectId(data.trement_subcatagiry)},{content_id:ObjectId(data.content_id)},{subcontent_id:ObjectId(data.subcontent_id)}]},callback)
}
HomeContentModel.prototype.gelinkcontentdata=function(data,callback){

var query={$and:[{treament_catagity:ObjectId(data.treament_catagity)},{trement_subcatagiry:ObjectId(data.trement_subcatagiry)}]}
//var query={treament_catagity:ObjectId(data.treament_catagity)}
contentlinkschema.aggregate([{$match:query},{
        $lookup: {
            from: 'homecontents',
            localField: 'content_id',
            foreignField: '_id',
            as: 'cat_data'
        }
        },
        {
        $lookup: {
            from: 'subcontents',
            localField: 'subcontent_id',
            foreignField: '_id',
            as: 'subcat_data'
        }
        },{
        $lookup: {
            from: 'contentimages',
            localField:'_id',
            foreignField: 'contentlink_id',
            as: 'contentparagrap'
        }
        }],callback)
 
}
HomeContentModel.prototype.getcontentlink=function(data,callback){

var query={$and:[{category_id:ObjectId(data.category_id)},{subcategry_id:ObjectId(data.subcategry_id)}]}
//var query={treament_catagity:ObjectId(data.treament_catagity)}
contentlinkschema.aggregate([{$match:query},{
        $lookup: {
            from: 'homecontents',
            localField: 'category_id',
            foreignField: '_id',
            as: 'cat_data'
        }
        },
        {
        $lookup: {
            from: 'subcontents',
            localField: 'subcategry_id',
            foreignField: '_id',
            as: 'subcat_data'
        }
        },{
        $lookup: {
            from: 'contentimages',
            localField:'subcategry_id',
            foreignField: 'subcategry_id',
            as: 'contentparagrap'
        }
        }
        ],callback)
 
}
HomeContentModel.prototype.updatecontentlink=function(data,callback){

contentlinkschema.update({_id:data.id},{$set:data},callback)
}
HomeContentModel.prototype.countimage=function(data,callback){
contentimage.find({$and:[{category_id:data.category_id},{subcategry_id:data.subcategry_id},{type:'image'}]},callback)
}
HomeContentModel.prototype.countparagraph=function(data,callback){
contentimage.find({$and:[{category_id:data.category_id},{subcategry_id:data.subcategry_id},{type:'paragraph'}]},callback)
}
module.exports = HomeContentModel;