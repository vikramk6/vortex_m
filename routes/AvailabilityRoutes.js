
var express = require('express'),
BookingAvailabiltyController = require('../controllers/BookingAvailabilty'),
AvailBookingRoutes = express.Router(),
bac = new BookingAvailabiltyController();

AvailBookingRoutes.get('/all', bac.findDoctors.bind(bac));
AvailBookingRoutes.get('/doctors_details', bac.findDoctorsNReception.bind(bac));
AvailBookingRoutes.post('/', bac.create.bind(bac));
AvailBookingRoutes.get('/doctor/:doctor_id', bac.getAvailability.bind(bac));
AvailBookingRoutes.get('/mounthwisedates',bac.mounthwisedates.bind(bac))
AvailBookingRoutes.post('/mouthdates',bac.mouthdates.bind(bac))
AvailBookingRoutes.post('/realsemouths',bac.realsemouths)
AvailBookingRoutes.get('/relesemouthdates',bac.relesemouthdates)
AvailBookingRoutes.post('/mouthwisedates',bac.mouthwisedates)

module.exports = AvailBookingRoutes;