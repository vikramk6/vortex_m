
var express = require('express'),
UnAvailableDatesController = require('../controllers/UnAvailableDatesController'),
UnAvailRoutes = express.Router(),
uadc = new UnAvailableDatesController();

UnAvailRoutes.post('/', uadc.create.bind(uadc));
UnAvailRoutes.get('/doctor/:user_id', uadc.getAvailability.bind(uadc));
UnAvailRoutes.delete('/:_id', uadc.DetleUnavailableDate.bind(uadc));

module.exports = UnAvailRoutes;