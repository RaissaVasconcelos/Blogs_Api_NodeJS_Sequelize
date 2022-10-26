const express = require('express');

// controller
const authController = require('../controllers/auth.controller');

const route = express.Router();

route.post('/login', authController.login);

route.post('/user', authController.loginUser);

module.exports = route;