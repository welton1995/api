const express = require('express');

const userControllers = require('../controllers/userControllers');
const postControllers = require('../controllers/postControllers');

const routes = express.Router();

routes.post('/', userControllers.create);       // Create Users
routes.get('/', userControllers.read);          // List Users
routes.put('/:id', userControllers.update);     // Update Users
routes.delete('/:id', userControllers.delete);  // Remover Users
routes.get('/:id', userControllers.listSpecificUser);  // List Specific Users

routes.post('/posts', postControllers.create);
routes.get('/posts', postControllers.read);

module.exports = routes;