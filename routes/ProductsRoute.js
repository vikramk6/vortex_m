
var express = require('express'),
    ProductsController = require('../controllers/ProductsController'),
    ProductsRoutes = express.Router(),
    prod = new ProductsController();

ProductsRoutes.get('/all-products/:user_id', prod.getAll.bind(prod));
ProductsRoutes.get('/:id', prod.getId.bind(prod));

ProductsRoutes.post('/', prod.create.bind(prod));
ProductsRoutes.put('/:id', prod.update.bind(prod));
ProductsRoutes.delete('/:id', prod.remove.bind(prod));

module.exports = ProductsRoutes;