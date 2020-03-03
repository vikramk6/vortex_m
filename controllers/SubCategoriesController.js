var SubCategoriesModel = require('../model/SubCategoriesModel'),
mongoose = require('mongoose'),
    doctormodel = require('../model/usermodal');

function SubCategoriesContoller() {
    subcatmod = new SubCategoriesModel();
    this.doctormodel = doctormodel;
}

SubCategoriesContoller.prototype.create = function (req, res, next) {
    if (!req.body.sub_category_name) {
        res.status(400).json({ status: '400', message: 'Please provide category_name' });
    } else if (!req.body.category_id) {
        res.status(400).json({ status: '400', message: 'Please provide category_id' });
    } else {
           subcatmod.create(req.body, function (c_err, c_data) {
        if (c_data) {
            res.status(200).json({ status: '200', message: 'successfully created a new sub_category', response: c_data });
        } else {
            res.status(400).json({ status: '400', error: c_err, message: 'Something went wrong' });
        }
    }) 
    }
}

SubCategoriesContoller.prototype.getAllSubCategories = function (req, res, next) {
    subcatmod.getAllSubCategories(req, function (c_err, c_data) {
        if (c_data.length) {
            res.status(200).json({ status: '200', message: 'success', response: c_data });
        } else if (c_data.length <= 0) {
            res.status(404).json({ status: '404', message: 'No sub_categories Found', response: c_data });
        } else {
            res.status(400).json({ status: '400', error: c_err, message: 'Something went wrong' });
        }
    })
}

SubCategoriesContoller.prototype.update = function (req, res, next) {
    subcatmod.update(req, function (c_err, c_data) {
        if (c_data) {
            res.status(200).json({ status: '200', message: 'successfully updated', response: c_data });
        } else {
            res.status(400).json({ status: '400', error: c_err, message: 'Something went wrong' });
        }
    })
}


SubCategoriesContoller.prototype.getById = function (req, res, next) {
    subcatmod.getById(req.params, function (c_err, c_data) {
        if (c_data.length) {
            res.status(200).json({ status: '200', message: 'success', response: c_data });
        } else if (c_data.length <= 0) {
            res.status(404).json({ status: '404', message: 'No Categories Found', response: c_data });
        } else {
            res.status(400).json({ status: '400', error: c_err, message: 'Something went wrong' });
        }
    })
}

SubCategoriesContoller.prototype.remove = function (req, res, next) {
    subcatmod.remove(req, function (data) {
        res.status(200).json(data);
    });
};

module.exports = SubCategoriesContoller;