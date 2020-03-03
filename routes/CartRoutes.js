
var express = require('express'),
CartController = require('../controllers/CartDetailsController'),
CartRoutes = express.Router(),
cart = new CartController();

CartRoutes.get('/:user_id', cart.getByUserId.bind(cart));
CartRoutes.post('/', cart.create.bind(cart));
CartRoutes.put('/:id', cart.update.bind(cart));
CartRoutes.delete('/:id', cart.remove.bind(cart));

module.exports = CartRoutes;