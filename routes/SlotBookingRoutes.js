
var express = require('express'),
SlotBookingController = require('../controllers/SlotBookingController'),
SlotBookingRoutes = express.Router(),
sbc = new SlotBookingController();

SlotBookingRoutes.get('/users/appointments/:doctor_id', sbc.getAppointmnets.bind(sbc));
SlotBookingRoutes.get('/:user_id', sbc.getuserAppointmnets.bind(sbc));
SlotBookingRoutes.get('/:user_id/all', sbc.getAllByUserId.bind(sbc));
SlotBookingRoutes.get('/:id', sbc.getId.bind(sbc));
SlotBookingRoutes.post('/', sbc.create.bind(sbc));
SlotBookingRoutes.put('/:id', sbc.update.bind(sbc));
SlotBookingRoutes.delete('/:id', sbc.remove.bind(sbc));
SlotBookingRoutes.post('/slotdates',sbc.slotdates.bind(sbc))
SlotBookingRoutes.post('/charge',sbc.charge.bind(sbc))

module.exports = SlotBookingRoutes;