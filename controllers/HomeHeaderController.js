var HomeHeaderModel = require('../model/homeHeaderModel'),
Imageupload = require('../utilities/imageUpload'), imageUpload;

function HomeContentController() {
    this.header = new HomeHeaderModel();
}
HomeContentController.prototype.getAll = function (req, res) {
    var _self = this;
    _self.header.get(req, function (headErr, headerdata) {
        res.status(200).json({ status: 200, message: "Success", header_data: headerdata });
    })

};

HomeContentController.prototype.getByDoctorId = function (req, res) {
    var _self = this;
    _self.header.getByDoctorId(req.params, function (headErr, headerdata) {
        if(headerdata.length) {
             res.status(200).json({ status: 200, message: "Success", header_data: headerdata });
        } else {
            res.status(200).json({ status: 200, message: "No doctors data found with this _id", header_data: headerdata });
        }
       
    })

};



HomeContentController.prototype.create = function (req, res, next) {
    let _self = this;
    if (!req.body.home_header) {
        res.status(400).json({ status: '400', message: "Please provide home_header" });
    } else if (!req.body.background_image) {
   
        res.status(400).json({ status: '400', message: "Please provide background_image" });
    }else {
         Imageupload.imageUpload(req.body.background_image, function (err, data) {
            if (err) {
                res.status(200).json({ status: '400', message: "Something went wrong" });
            } else if (data) {
                req.body.background_image = data;
                _self.header.create(req, function (cdata) {
                 res.status(200).json(cdata);
        });
            }
         })
        
    }
};

HomeContentController.prototype.update = function (req, res, next) {
    let _self =this;
    if(req.body.background_image) {
         Imageupload.imageUpload(req.body.background_image, function (err, data) {
            if (err) {
                res.status(200).json({ status: '400', message: "Something went wrong" });
            } else if (data) {
                req.body.background_image = data;
                   _self.header.update(req, function (data) {
        res.status(200).json(data);
    });
            }
         })   
    } else {
           _self.header.update(req, function (data) {
        res.status(200).json(data);
    });
    }
 

};

HomeContentController.prototype.remove = function (req, res, next) {
    this.header.remove(req, function (data) {
        res.status(200).json(data);
    });
};

module.exports = HomeContentController