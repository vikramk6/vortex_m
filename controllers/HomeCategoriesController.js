var config =require('../config/config.json');
var HomeCategoriesModel = require('../model/HomeCategoriesModel'),
mongoose = require('mongoose'),
fs =require('fs'),
    doctormodel = require('../model/usermodal'),
    Imageupload = require('../utilities/imageUpload'), imageUpload;

function HomeCategoriesController() {
  Hcm = new HomeCategoriesModel();
    this.doctormodel = doctormodel;
}

HomeCategoriesController.prototype.create = function (req, res, next) {
    if (!req.body.category_id) {
        res.status(400).json({ status: '400', message: 'Please provide category_id' });
    } else if (!req.body.sub_category_id) {
        res.status(400).json({ status: '400', message: 'Please provide sub_category_id' });
    }  else if (!req.body.heading) {
        res.status(400).json({ status: '400', message: 'Please provide heading' });
    } else if (!req.body.description) {
        res.status(400).json({ status: '400', message: 'Please provide description' });
    } else if (!req.body.link) {
        res.status(400).json({ status: '400', message: 'Please provide link' });
    } else {
       Hcm.getMatchCat(req.body, function (ferr, fdata) {
           if(fdata && fdata.length) {
               res.status(400).json({ status: '400', error: ferr, message: 'Already Added For This Category' });
           } else {
            if(req.body.logo){
                let d = new Date();
            let time = d.getDate() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds()
            let image_name = time + "_" + uniqid() + ".png";
            let imagePath = "./images/" + image_name;
            let db_path = image_name;
            fs.writeFileSync(imagePath, req.body.logo, 'base64');
            req.body.logo= db_path
                Hcm.create(req.body, function (c_err, c_data) {
                    if (c_data) {
                        res.status(200).json({ status: '200', message: 'successfully created a new description', response: c_data,"image_path":config.image_path});
                    } else {
                        res.status(400).json({ status: '400', error: c_err, message: 'Something went wrong' });
                    }
                })
            }else{
             Hcm.create(req.body, function (c_err, c_data) {
                    if (c_data) {
                        res.status(200).json({ status: '200', message: 'successfully created a new description', response: c_data });
                    } else {
                        res.status(400).json({ status: '400', error: c_err, message: 'Something went wrong' });
                    }
                })
           }
      }
       })
       
    }
}

HomeCategoriesController.prototype.get = function (req, res, next) {
    Hcm.getMatchCat(req.params, function (match_err, match_res) {
        if(match_err) {
             res.status(400).json({ status: '400', error: match_err, message: 'Something went wrong' });
        } else {
             res.status(200).json({ status: '200', message: 'success', response: match_res });
        }
    })
}

HomeCategoriesController.prototype.getAll = function (req, res, next) {
    Hcm.getAll(req, function (match_err, match_res) {
        if(match_err) {
             res.status(400).json({ status: '400', error: match_err, message: 'Something went wrong' });
        } else {
             res.status(200).json({ status: '200', message: 'success', response: match_res });
        }
    })
}

HomeCategoriesController.prototype.getById = function (req, res, next) {
    Hcm.getById(req.params, function (match_err, match_res) {
        if(match_err) {
             res.status(400).json({ status: '400', error: match_err, message: 'Something went wrong' });
        } else {
             res.status(200).json({ status: '200', message: 'success', response: match_res,"image_path":config.image_path });
        }
    })
}

HomeCategoriesController.prototype.update = function (req, res, next) {
if(req.body.logo){
          let d = new Date();
            let time = d.getDate() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds()
            let image_name = time + "_" + uniqid() + ".png";
            let imagePath = "./images/" + image_name;
            let db_path = image_name;
            fs.writeFileSync(imagePath, req.body.logo, 'base64');
            req.body.logo= db_path
    Hcm.update(req, function (c_err, c_data) {
        if (c_data) {
            res.status(200).json({ status: '200', message: 'successfully updated', response: c_data,"image_path":config.image_path});
        } else {
            res.status(400).json({ status: '400', error: c_err, message: 'Something went wrong' });
        }
    })
    }else{
        Hcm.update(req, function (c_err, c_data) {
        if (c_data) {
            res.status(200).json({ status: '200', message: 'successfully updated', response: c_data,"image_path":config.image_path});
        } else {
            res.status(400).json({ status: '400', error: c_err, message: 'Something went wrong' });
        }
    })
    }
}

HomeCategoriesController.prototype.remove = function (req, res, next) {
    Hcm.remove(req, function (data) {
        res.status(200).json(data);
    });
};



module.exports = HomeCategoriesController;