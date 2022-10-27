const categoriesService = require('../service/categories.service');

const errorMap = require('../utils/errorMap');

const HTTPS_STATUS_CREATED = 201;

const addCategories = async (req, res) => {
  const { type, message } = await categoriesService.addCategories(req.body);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(HTTPS_STATUS_CREATED).json(message);
};

module.exports = {
  addCategories,
};