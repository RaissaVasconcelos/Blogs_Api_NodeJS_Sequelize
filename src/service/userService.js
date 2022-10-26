const { User } = require('../models');

const login = async (data) => {
  const result = await User.create(data);
  console.log('result', result);
  return result;
};

module.exports = {
  login,
};