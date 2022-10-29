const postsService = require('../service/posts.services');
const errorMap = require('../utils/errorMap');

// const HTTPS_STATUS_OK = 200;
const HTTPS_STATUS_CREATED = 201;

const addPosts = async (req, res) => {
  const { authorization } = req.headers;

  const { type, message } = await postsService.validatedPost(req.body);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  const result = await postsService.addPosts(req.body, authorization);

  return res.status(HTTPS_STATUS_CREATED).json(result);
};

module.exports = {
  addPosts,
};