const express = require('express');

const postController = require('../controllers/posts.controller');

const { midlewareToken } = require('../midlewares/tokenValidation');

const route = express.Router();

route.get('/post/search', midlewareToken, postController.searchPost);

route.get('/post/:id', midlewareToken, postController.getById);

route.put('/post/:id', midlewareToken, postController.editedPost);

route.delete('/post/:id', midlewareToken, postController.deletedPost);

route.post('/post', midlewareToken, postController.addPosts);

route.get('/post', midlewareToken, postController.getPosts);

module.exports = route;