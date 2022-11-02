const express = require('express');

// controller
const userController = require('../controllers/user.controller');
// midlewares
const { midlewareToken } = require('../midlewares/tokenValidation');

const route = express.Router();

// rota publica
route.post('/user', userController.loginUser);

// rota privada
route.delete('/user/me', midlewareToken, userController.deletedUser);
route.get('/user/:id', midlewareToken, userController.getById);
route.get('/user', midlewareToken, userController.getAll);

module.exports = route;