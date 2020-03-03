
var express = require('express'),
FinalContentController = require('../controllers/FinalContentController'),
FinalContentRoutes = express.Router(),
scc = new FinalContentController();

FinalContentRoutes.get('/content/:content_id', scc.getAllByContentId.bind(scc));
FinalContentRoutes.get('/links', scc.getLinks.bind(scc));
FinalContentRoutes.get('/sub_content/:sub_content', scc.get.bind(scc));
FinalContentRoutes.get('/final/:id', scc.getId.bind(scc));
FinalContentRoutes.get('/final_content_id/:final_content_id', scc.getAllByContentId.bind(scc));

FinalContentRoutes.get('/all', scc.getAll.bind(scc));

FinalContentRoutes.post('/', scc.create.bind(scc));
FinalContentRoutes.put('/:id', scc.update.bind(scc));
FinalContentRoutes.delete('/:id', scc.remove.bind(scc));


module.exports = FinalContentRoutes;