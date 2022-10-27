const express = require('express');

// controller
const userController = require('../controllers/user.controller');
// midlewares
const { midlewareToken } = require('../midlewares/tokenValidation');

const route = express.Router();

// rota publica
route.post('/user', userController.loginUser);

// route.use(tokenMidleware.midlewareToken);

// rota privada
route.get('/user', midlewareToken, userController.getAll);
route.get('/user/:id', midlewareToken, userController.getById);

module.exports = route;