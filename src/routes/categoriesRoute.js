const express = require('express');

// controller
const categoriesController = require('../controllers/categories.controller');
// midlewares
const { midlewareToken } = require('../midlewares/tokenValidation');

const route = express.Router();

// rota privada
route.post('/categories', midlewareToken, categoriesController.addCategories);

module.exports = route;