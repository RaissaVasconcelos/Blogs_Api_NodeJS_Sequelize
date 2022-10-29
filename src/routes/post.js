const express = require('express');

const postController = require('../controllers/posts.controller');

const { midlewareToken } = require('../midlewares/tokenValidation');

const route = express.Router();

route.post('/post', midlewareToken, postController.addPosts);

module.exports = route;