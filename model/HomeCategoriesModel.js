
var HomeCatSchema = require('./schemas/HomeCategoriesSchema'),
    CategoriesSchema = require('./schemas/CategoriesSchema'),
    SubCategoriesSchema = require('./schemas/SubCategoriesSchema'),
        finalContentSchema = require('./schemas/finalContentSchema'),

    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;



function HomeCatModel() {

}

HomeCatModel.prototype.create = function (req, callback) {

    HomeCatSchema.create(req, callback)
}

HomeCatModel.prototype.getMatchCat = function (req, callback) {
    //HomeCatSchema.find({"category_id":req.category_id, "sub_category_id":req.sub_category_id}, callback);
    HomeCatSchema.aggregate([
        {
            $match: {
                $and: [
                    { "trementcat_id": mongoose.Types.ObjectId(req.category_id) },
                    { "trementsub_id": mongoose.Types.ObjectId(req.sub_category_id) }
                ]
            }
        },
        {
            $lookup: {
                from: 'questionares',
                localField: 'trementsub_id',
                foreignField: 'sub_category_id',
                as: 'questionnaires'
            }
        }], callback)
}


HomeCatModel.prototype.getAll = function (req, callback) {
    HomeCatSchema.aggregate([
        {
            $lookup: {
                from: 'questionares',
                localField: 'sub_category_id',
                foreignField: 'sub_category_id',
                as: 'questionnaires'
            }
        }], function (err, data) {
            if (data) {
                var response = [];
                data.map(function (value, index) {
                    console.log(value,index)
                       finalContentSchema.find({}, function (final_links_err, final_links_data) {
                        if (final_links_data) {
                            
                            value.links = final_links_data.map((fCon, fIndex) => {
                                 return {final_content_id: fCon._id,link:fCon.link}
                            })
                        } else {
                            value.links = [];
                        }
                    })

                    CategoriesSchema.find({ _id: value.category_id }, function (c_err, c_data) {
                        value.category_id = c_data;
                        SubCategoriesSchema.find({ _id: value.sub_category_id }, function (sub_err, sub_data) {
                            value.sub_category_id = sub_data;
                            response.push(value);
                            if (data.length === response.length) {
                                callback(null, response)
                            }
                        })

                    })
                })
            } else {
                console.log(err, data);
                callback(err, data);
            }
        })
}

HomeCatModel.prototype.getById = function (req, callback) {
    HomeCatSchema.find({_id: req.id}, callback);
}


HomeCatModel.prototype.update = function (req, callback) {
    HomeCatSchema.update({_id: req.params.id}, req.body,{ multi: true },callback)
}

HomeCatModel.prototype.remove = function (req, callback) {
    HomeCatSchema.remove({ _id: req.params.id }, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Successfully deleted", response: data })
        }
    });
};
module.exports = HomeCatModel;