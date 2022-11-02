const postsService = require('../service/posts.services');
const errorMap = require('../utils/errorMap');

const HTTPS_STATUS_OK = 200;
const HTTPS_STATUS_CREATED = 201;
const HTTPS_STATUS_DELETED = 204;

const addPosts = async (req, res) => {
  const { authorization } = req.headers;

  const { type, message } = await postsService.validatedPost(req.body);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  const result = await postsService.addPosts(req.body, authorization);

  return res.status(HTTPS_STATUS_CREATED).json(result);
};

const getPosts = async (_req, res) => {
  const result = await postsService.getPosts();
  return res.status(HTTPS_STATUS_OK).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await postsService.getById(Number(id));
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(HTTPS_STATUS_OK).json(message);
};

const editedPost = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { type, message } = await postsService.editedPost(Number(id), req.body, authorization);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(HTTPS_STATUS_OK).json(message);
};

const deletedPost = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { type, message } = await postsService.deletedPost(Number(id), authorization);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(HTTPS_STATUS_DELETED).end();
};

module.exports = {
  addPosts,
  getPosts,
  getById,
  editedPost,
  deletedPost,
};