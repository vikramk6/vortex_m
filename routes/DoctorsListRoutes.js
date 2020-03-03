
var express = require('express'),
    DoctorsListController = require('../controllers/DoctorsListController'),
    DoctorsListRoutes = express.Router(),
    dlc = new DoctorsListController();

DoctorsListRoutes.get('/doctors/:clinic_id', dlc.getDoctorsByClinicId.bind(dlc));
// DoctorsListRoutes.get('/:id', dlc.getId.bind(dlc));
// DoctorsListRoutes.delete('/:id', dlc.remove.bind(dlc));

module.exports = DoctorsListRoutes;