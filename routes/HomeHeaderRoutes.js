
var express = require('express'),
    HomeHeaderController = require('../controllers/HomeHeaderController'),
    HomeHeaderRoutes = express.Router(),
    hheadercon = new HomeHeaderController();

HomeHeaderRoutes.get('/all', hheadercon.getAll.bind(hheadercon));
HomeHeaderRoutes.get('/doctor/:doctor_id', hheadercon.getByDoctorId.bind(hheadercon));
HomeHeaderRoutes.post('/', hheadercon.create.bind(hheadercon));
HomeHeaderRoutes.put('/:id', hheadercon.update.bind(hheadercon));
HomeHeaderRoutes.delete('/:id', hheadercon.remove.bind(hheadercon));

module.exports = HomeHeaderRoutes;