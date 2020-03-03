var finalContentSchema = require('./schemas/finalContentSchema'),
mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;



function FinalContentModel() {
   
}

FinalContentModel.prototype.getLinks = function (callback) {
    finalContentSchema.find({}, function (final_links_err, final_links_data) {
        var links = [];
        if (final_links_data) {
             links = final_links_data.map((fCon, fIndex) => {
                return { final_content_id: fCon._id, link: fCon.link }
            })
        
            callback(final_links_err,links);
        } else {
            links = [];
            callback(final_links_err,links);
        }
    });
}

FinalContentModel.prototype.getAll = function (req, callback) {
    // finalContentSchema.find({}, callback);

    let _self = this, response = [];
        finalContentSchema.aggregate([
        {
        $lookup: {
            from: 'subcontents',
            localField: 'sub_content_id',
            foreignField: '_id',
            as: 'sub_content'
        }
        },
           {
        $lookup: {
            from: 'homecontents',
            localField: 'content_id',
            foreignField: '_id',
            as: 'home_content'
        }
    }
    ], function (err, data) {

        callback(err, data);
    });
    
    

};

FinalContentModel.prototype.get = function (req, callback) {
    finalContentSchema.find({ sub_content_id: req.params.sub_content_id }, callback);
};

FinalContentModel.prototype.getByContentId = function (req, callback) {
    
    
    var content = (req.body && req.body.content_id) ? req.body.content_id : (req.params && req.params.content_id) ? req.params.content_id : null;
    
    finalContentSchema.find({ content_id: content }, callback);
};

FinalContentModel.prototype.getBySubContentId = function (req, callback) {
    
        
    var content = (req.body && req.body.sub_content_id) ? req.body.sub_content_id : (req.params && req.params.sub_content_id) ? req.params.sub_content_id : null;
    
    finalContentSchema.find({ sub_content_id: content }, callback);
};

FinalContentModel.prototype.getId = function (req, callback) {
    finalContentSchema.findOne({ _id: req.params.id }, callback);
};

FinalContentModel.prototype.getAllContentsById = function (req, callback) {
    let _self = this, response = [];
        finalContentSchema.aggregate([
               {
                            $match: {
                                '_id': mongoose.Types.ObjectId(req.params.final_content_id)
                            }
                        },
        {
        $lookup: {
            from: 'subcontents',
            localField: 'sub_content_id',
            foreignField: '_id',
            as: 'sub_content'
        }
        },
           {
        $lookup: {
            from: 'homecontents',
            localField: 'content_id',
            foreignField: '_id',
            as: 'home_content'
        }
    }
    ], function (err, data) {

        callback(err, data);
    });
    
};

FinalContentModel.prototype.create = function (req, callback) {
    var _self = this;
    if (req.body.sub_content_id) {
        finalContentSchema.aggregate([
            {
                $match: {
                    $and: [
                        { sub_content_id: mongoose.Types.ObjectId(req.body.sub_content_id) },
                        { content_id: mongoose.Types.ObjectId(req.body.content_id) }

                    ]


                }
            }
        ], function (err, data) {
            console.log(data);
            if (!data.length) {
                finalContentSchema.create(req.body, function (ferr, fdata) {
                    if (err) {
                        callback({ status: '400', message: "Something went wrong" })
                    } else {
                        callback({ status: '200', message: "Success", response: fdata })
                    }
                });
            } else {
                callback({ status: '200', message: "Already added for this  sub-content", response: data })
            }

        });
    } else {
        var isExist = true;
        finalContentSchema.aggregate([
            {
                $match: {
                    $and: [
                        { content_id: mongoose.Types.ObjectId(req.body.content_id) }
                    ]
                }
            }
        ], function (err, data) {
              data.forEach(function (d, index) {
                console.log(d.sub_content_id, req.body.sub_content_id);
                if(d.sub_content_id == req.body.sub_content_id) {
                    return isExist = false;
                } else {
                   return isExist = true; 
                }
            })
            if(!isExist) {
                  callback({ status: '200', message: "Already added for this  sub-content", response: data })
                   
            } else {
                  finalContentSchema.create(req.body, function (finalerr, finaldata) {
                if (err) {
                    callback({ status: '400', message: "Something went wrong", err: finalerr })
                } else {
                    callback({ status: '200', message: "Success", response: finaldata })
                }
            });
            }
         
        });
    }


    //     _self.getBySubContentId(req, function (co_err, co_data) {
    //         if (!co_data.length) {
    //                 finalContentSchema.create(req.body, function (err, data) {
    //     if (err) {
    //         callback({ status: '400', message: "Something went wrong" })
    //     } else {
    //         callback({ status: '200', message: "Success", response: data })
    //     }
    // });
    //         } else {
    //              callback({ status: '200', message: "Already added for this  sub-content", response: co_data }) 
    //         }
    //     })

};

FinalContentModel.prototype.update = function (req, callback) {
    finalContentSchema.update({ _id: req.params.id }, req.body, { multi: true }, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Success", response: data })
        }
    })
};

FinalContentModel.prototype.remove = function (req, callback) {
    finalContentSchema.remove({ _id: req.params.id }, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Success", response: data })
        }
    });
};

module.exports = FinalContentModel;