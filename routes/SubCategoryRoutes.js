
var express = require('express'),
    SubCategoriesContoller = require('../controllers/SubCategoriesController'),
    SubCategoriesRoutes = express.Router(),
    scc = new SubCategoriesContoller();

 SubCategoriesRoutes.get('/all', scc.getAllSubCategories.bind(scc));
 SubCategoriesRoutes.get('/subcategory_id/:subcategory_id', scc.getById.bind(scc));
 SubCategoriesRoutes.post('/', scc.create.bind(scc));
 SubCategoriesRoutes.put('/:id', scc.update.bind(scc));
 SubCategoriesRoutes.delete('/:id', scc.remove.bind(scc));

module.exports = SubCategoriesRoutes;