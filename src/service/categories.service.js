const { Category } = require('../models');

const addCategories = async ({ name }) => {
  if (!name) return { type: 'FIELD_IS_REQUIRED', message: '"name" is required' };

  const result = await Category.create({ name });
  return { type: null, message: result.dataValues };
};

const getAll = async () => {
  const result = await Category.findAll();
  return result;
};

module.exports = {
  addCategories,
  getAll,
};
