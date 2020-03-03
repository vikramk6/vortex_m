var subContentSchema = require('./schemas/subContentSchema');




function SubContentModel() {
    this.scs = subContentSchema;
}

SubContentModel.prototype.get = function (req, callback) {
    let _self = this, response = [];
    _self.scs.find({content_id: req.params.content_id}, function (err, data) {
      
        if(data.length) {
            data.forEach(function (v,i) {
                  _self.aggregate({content_id: v.content_id, subcontent_id: v._id}, function (errror, result) {
                     response.push(result[0]);
                     if(response.length === data.length) {
                         callback(errror, response);
                     }
                 })
            })
           
        }
        
        
        
    });
    
   
};
SubContentModel.prototype.getId = function (req, callback) {
    this.scs.findOne({ _id: req.params.id }, callback);
};

SubContentModel.prototype.create = function (req, callback) {
    this.scs.create(req.body, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Success", response: data })
        }
    });
};

SubContentModel.prototype.update = function (req, callback) {
    this.scs.update({ _id: req.params.id }, req.body, { multi: true }, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Success", response: data })
        }
    })
};

SubContentModel.prototype.remove = function (req, callback) {
    this.scs.remove({ _id: req.params.id }, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Success", response: data })
        }
    });
};

SubContentModel.prototype.aggregate = function (req, callback) {
    this.scs.aggregate([
           {
                $match: {
                    $and: [ 
                    {_id: req.subcontent_id},
                    {content_id: req.content_id}
                    ]
                    
                    
                    }
            },
        {
        $lookup: {
             from: 'final-contents',
            localField: '_id',
            foreignField: 'sub_content_id',
            as: 'final_content'
        },
    }


    ], function (err, data) {

        callback(err, data);
    });
};

module.exports = SubContentModel;