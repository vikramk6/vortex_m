
var express = require('express'),
    SubContentController = require('../controllers/SubContentController'),
    SubContentRoutes = express.Router(),
    scc = new SubContentController();

SubContentRoutes.get('/:content_id/all', scc.getAllByContentId.bind(scc));
SubContentRoutes.get('/:id', scc.getId.bind(scc));
SubContentRoutes.post('/', scc.create.bind(scc));
SubContentRoutes.put('/:id', scc.update.bind(scc));
SubContentRoutes.delete('/:id', scc.remove.bind(scc));


module.exports = SubContentRoutes;