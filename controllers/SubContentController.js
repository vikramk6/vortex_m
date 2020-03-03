var SubContentModel = require('../model/subContentModel'),
HomeHeaderModel = require('../model/homeHeaderModel'),
    Imageupload = require('../utilities/imageUpload'), imageUpload;

function SubContentController() {
    this.subModel = new SubContentModel();
    this.header = new HomeHeaderModel();
}

SubContentController.prototype.getAllByContentId = function (req, res) {
    let _self = this;
    _self.subModel.get(req, function (err, data) {
        if (data && data.length) {
             _self.header.get(req, function (headErr, headerdata) {
            if(headerdata) {
                         res.status(200).json({ status:200, message: "Success", header: headerdata[0].home_header, sub_content: data });
            } else {
                         res.status(200).json({ status:204, message:"No content found", header: headerdata[0].home_header, sub_content: data });
            }
   
        })
        } else {
            res.status(200).json({ status: 400, message: "No records found" });
        }

    });
};

SubContentController.prototype.getId = function (req, res) {
    this.subModel.getId(req, function (err, data) {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(200).json({ status: 400, message: "No records found" });
        }
    });
};

SubContentController.prototype.create = function (req, res, next) {
    if (!req.body.content_id) {
        res.status(200).json({ status: '400', message: "Please provide content_name" });
    } else if (!req.body.sub_content_name) {
        res.status(200).json({ status: '400', message: "Please provide content_name" });
    } else if (!req.body.sub_content_image) {
        res.status(200).json({ status: '400', message: "Please provide content_image" });
    } else if (!req.body.sub_content_text) {
        res.status(200).json({ status: '400', message: "Please provide content_text" });
    } else if (!req.body.link) {
        res.status(200).json({ status: '400', message: "Please provide link" });
    } else {
        let _self = this
        Imageupload.imageUpload(req.body.sub_content_image, function (err, data) {
            if (err) {
                res.status(200).json({ status: '400', message: "Something went wrong" });
            } else if (data) {
                req.body.sub_content_image = data;
                if (req.body.background_image) {
                    Imageupload.imageUpload(req.body.background_image, function (berr, bdata) {
                        if (berr) {
                            res.status(201).json({ status: '400', message: "Something went wrong" });
                        } else if (bdata) {
                            req.body.background_image = bdata;
                            _self.subModel.create(req, function (cdata) {
                                res.status(200).json(cdata);
                            });
                        }
                    });

                } else {
                    _self.subModel.create(req, function (cdata) {
                        res.status(200).json(cdata);
                    });
                }
            }
        })
    }
};

SubContentController.prototype.update = function (req, res, next) {
    let _self = this;
    if (req.body.sub_content_image) {
        Imageupload.imageUpload(req.body.sub_content_image, function (err, data) {
            if (err) {
                res.status(201).json({ status: '400', message: "Something went wrong" });
            } else if (data) {
                req.body.sub_content_image = data;
                _self.subModel.update(req, function (udata) {
                    res.status(200).json(udata);
                });
            }
        });
    } else {
        this.subModel.update(req, function (data) {
            res.status(200).json(data);
        });
    }
};

SubContentController.prototype.remove = function (req, res, next) {
    this.subModel.remove(req, function (data) {
        res.status(200).json(data);
    });
};

module.exports = SubContentController