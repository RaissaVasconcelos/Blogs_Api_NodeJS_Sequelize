const express = require('express');

// controller
const userController = require('../controllers/user.controller');
// midlewares
const tokenMidleware = require('../midlewares/tokenValidation');

const route = express.Router();

// rota publica
route.post('/user', userController.loginUser);

// route.use(tokenMidleware.midlewareToken);

// rota privada
route.get('/user', tokenMidleware.midlewareToken, userController.getAll);

module.exports = route;