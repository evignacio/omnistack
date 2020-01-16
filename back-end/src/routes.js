const { Router } = require('express');

const DevController = require('./controller/DevController');
const SearchController = require('./controller/SearchController');

const routes = Router();

routes.get('/dev', DevController.index);
routes.post('/dev', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes;