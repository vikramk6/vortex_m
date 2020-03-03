
var express = require('express'),
    HomeContentController = require('../controllers/HomeContentController'),
    HomeContentRoutes = express.Router(),
    hcc = new HomeContentController();

HomeContentRoutes.get('/all', hcc.getAll.bind(hcc));
HomeContentRoutes.get('/:id', hcc.getId.bind(hcc));

HomeContentRoutes.post('/', hcc.create.bind(hcc));
HomeContentRoutes.put('/:id', hcc.update.bind(hcc));
HomeContentRoutes.delete('/:id', hcc.remove.bind(hcc));
HomeContentRoutes.delete('/delete/:id', hcc.removecontent.bind(hcc));
HomeContentRoutes.post('/subcontentdata',hcc.subcontentdata.bind(hcc))
HomeContentRoutes.post('/savecontentparagraph',hcc.savecontentparagraph.bind(hcc))
HomeContentRoutes.post('/deletecontentparagraph',hcc.deletecontentparagraph.bind(hcc))
HomeContentRoutes.post('/updateparagrah',hcc.updateparagrah.bind(hcc))
HomeContentRoutes.post('/savecontentimage',hcc.savecontentimage.bind(hcc))
HomeContentRoutes.post('/deletecontentimage',hcc.deletecontentimage.bind(hcc))
HomeContentRoutes.post('/updatecontentimage',hcc.updatecontentimage.bind(hcc))
HomeContentRoutes.post('/getcatagiries',hcc.getcatagiries.bind(hcc))
HomeContentRoutes.post('/contentlink',hcc.contentlink.bind(hcc))
HomeContentRoutes.post('/gettrementcatagiries',hcc.gettrementcatagiries.bind(hcc))
HomeContentRoutes.post('/gelinkcontentdata',hcc.gelinkcontentdata.bind(hcc))
HomeContentRoutes.post('/getcontentlink',hcc.getcontentlink.bind(hcc))
HomeContentRoutes.post('/updatecontentlink',hcc.updatecontentlink.bind(hcc))
HomeContentRoutes.post('/charge',hcc.charge.bind(hcc))



module.exports = HomeContentRoutes;