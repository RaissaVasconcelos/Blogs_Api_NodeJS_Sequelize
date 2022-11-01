const express = require('express');

const postController = require('../controllers/posts.controller');

const { midlewareToken } = require('../midlewares/tokenValidation');

const route = express.Router();

route.get('/post/:id', midlewareToken, postController.getById);

route.post('/post', midlewareToken, postController.addPosts);

route.get('/post', midlewareToken, postController.getPosts);

route.put('/post/:id', midlewareToken, postController.editedPost);

module.exports = route;