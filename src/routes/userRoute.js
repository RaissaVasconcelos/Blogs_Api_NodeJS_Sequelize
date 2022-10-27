const express = require('express');

// controller
const userController = require('../controllers/user.controller');

const route = express.Router();

route.post('/user', userController.loginUser);

module.exports = route;