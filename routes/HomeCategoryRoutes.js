
var express = require('express'),
    HomeCategoriesController = require('../controllers/HomeCategoriesController'),
    HomeCategoriesRoutes = express.Router(),
    hcc = new HomeCategoriesController();

 HomeCategoriesRoutes.get('/category_id/:category_id/sub_category_id/:sub_category_id', hcc.get.bind(hcc));
 HomeCategoriesRoutes.get('/description', hcc.getAll.bind(hcc));
 HomeCategoriesRoutes.get('/description_id/:id', hcc.getById.bind(hcc));
 HomeCategoriesRoutes.post('/', hcc.create.bind(hcc));
 HomeCategoriesRoutes.put('/:id', hcc.update.bind(hcc));
 HomeCategoriesRoutes.delete('/:id', hcc.remove.bind(hcc));

module.exports = HomeCategoriesRoutes;