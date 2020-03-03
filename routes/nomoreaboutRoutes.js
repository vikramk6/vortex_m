
var express = require('express'),
    nomoreContoller = require('../controllers/nomoreContoller'),
    nomoreRoutes = express.Router(),
    nmc = new nomoreContoller();

 nomoreRoutes.get('/all', nmc.getnomoredata.bind(nmc));
 nomoreRoutes.get('/:_id', nmc.getById.bind(nmc));
 nomoreRoutes.post('/', nmc.create.bind(nmc));
 nomoreRoutes.put('/:id', nmc.update.bind(nmc));
 //CategoriesRoutes.delete('/:id', cc.remove.bind(cc));
 //CategoriesRoutes.post('/subcatgiries',cc.subcatgiries.bind(cc))
 //CategoriesRoutes.post('/getcontentlink',cc.getcontentlink.bind(cc))
 

module.exports = nomoreRoutes ;