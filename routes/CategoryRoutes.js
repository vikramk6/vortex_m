
var express = require('express'),
    CategoriesContoller = require('../controllers/CategoriesContoller'),
    CategoriesRoutes = express.Router(),
    cc = new CategoriesContoller();

 CategoriesRoutes.get('/all', cc.getAllCategories.bind(cc));
 CategoriesRoutes.get('/category_id/:category_id', cc.getById.bind(cc));
 CategoriesRoutes.post('/', cc.create.bind(cc));
 CategoriesRoutes.put('/:id', cc.update.bind(cc));
 CategoriesRoutes.delete('/:id', cc.remove.bind(cc));
 CategoriesRoutes.post('/subcatgiries',cc.subcatgiries.bind(cc))
 CategoriesRoutes.post('/getcontentlink',cc.getcontentlink.bind(cc))
 

module.exports = CategoriesRoutes;