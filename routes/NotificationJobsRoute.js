var express = require('express'),
    JobsController = require('../controllers/NotificationJobsController'),
    router = express.Router(),
    jc = new JobsController();

router.get('/', jc.getAll);

module.exports = router;