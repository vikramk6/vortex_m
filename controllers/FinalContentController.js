var FinalContentModel = require('../model/finalContentModel'),
    Imageupload = require('../utilities/imageUpload'), imageUpload;

function FinalContentController() {
    this.fcm = new FinalContentModel();
}

FinalContentController.prototype.getLinks = function (req, res) {
    this.fcm.getLinks(function (err, data) {
        if (data && data.length) {
            res.status(200).json({ status: 200, message: "Success", links: data });
        } else {
            res.status(400).json({ status: 400, message: "No records found" });
        }
    });
};
FinalContentController.prototype.getLinks = function (req, res) {
    this.fcm.getLinks(function (err, data) {
        if (data && data.length) {
            res.status(200).json({ status: 200, message: "Success", links: data });
        } else {
            res.status(400).json({ status: 400, message: "No records found" });
        }
    });
};

FinalContentController.prototype.getAllByContentId = function (req, res) {
    this.fcm.getAllContentsById(req, function (err, data) {
        if (data && data.length) {
            res.status(200).json({ status: 200, message: "Success", final_content: data });
        } else {
            res.status(200).json({ status: 400, message: "No records found" });
        }
    });
};

FinalContentController.prototype.get = function (req, res) {
    this.fcm.get(req, function (err, data) {
        if (data && data.length) {
            res.status(200).json({ status: 200, message: "Success", final_content: data });
        } else {
            res.status(200).json({ status: 400, message: "No records found" });
        }
    });
};

FinalContentController.prototype.getAll = function (req, res) {
    this.fcm.getAll(req, function (err, data) {
        if (data && data.length) {
            res.status(200).json({ status: 200, message: "Success", final_content: data });
        } else {
            res.status(200).json({ status: 400, message: "No records found" });
        }
    });
};

FinalContentController.prototype.getId = function (req, res) {
    this.fcm.getId(req, function (err, data) {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(200).json({ status: 400, message: "No records found" });
        }
    });
};

FinalContentController.prototype.create = function (req, res, next) {
    if (!req.body.content_id) {
        res.status(200).json({ status: '400', message: "Please provide content_id" });
    } else if (!req.body.section_name) {
        res.status(200).json({ status: '400', message: "Please provide section_name" });
    } else if (!req.body.section_image) {
        res.status(200).json({ status: '400', message: "Please provide section_image" });
    } else if (!req.body.section_text) {
        res.status(200).json({ status: '400', message: "Please provide section_text" });
    } else if (!req.body.link) {
        res.status(200).json({ status: '400', message: "Please provide link" });
    } else {
        let _self = this
        Imageupload.imageUpload(req.body.section_image, function (err, data) {
            if (err) {
                res.status(200).json({ status: '400', message: "Something went wrong" });
            } else if (data) {
                req.body.section_image = data;
                if (req.body.background_image) {
                    Imageupload.imageUpload(req.body.background_image, function (berr, bdata) {
                        if (berr) {
                            res.status(200).json({ status: '400', message: "Something went wrong" });
                        } else if (bdata) {
                            req.body.background_image = bdata;
                            _self.fcm.create(req, function (cdata) {
                                res.status(200).json(cdata);
                            });
                        }
                    });

                } else {
                    _self.fcm.create(req, function (cdata) {
                        res.status(200).json(cdata);
                    });
                }

            }
        })
    }
};

FinalContentController.prototype.update = function (req, res, next) {
    let _self = this;
    if (req.body.section_image) {
        Imageupload.imageUpload(req.body.section_image, function (err, data) {
            if (err) {
                res.status(200).json({ status: '400', message: "Something went wrong" });
            } else if (data) {
                req.body.section_image = data;
                _self.fcm.update(req, function (udata) {
                    res.status(200).json(udata);
                });
            }
        });
    } else {
        this.fcm.update(req, function (data) {
            res.status(200).json(data);
        });
    }
};

FinalContentController.prototype.remove = function (req, res, next) {
    this.fcm.remove(req, function (data) {
        res.status(200).json(data);
    });
};

module.exports = FinalContentController