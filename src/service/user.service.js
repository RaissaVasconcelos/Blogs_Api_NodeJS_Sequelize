const jwtUtil = require('../utils/jwt.utils');

const { User } = require('../models');

// validações
const { schemaUser } = require('../utils/validations');

const validadeUser = (params) => {
  const { error, value } = schemaUser.validate(params);

  if (error) return error.message;
  return value;
};

const createUser = async ({ displayName, email, password, image }) => {
  const user = await User.findOne({ where: { email } });

  // verifica se o usuário existe no DB
  if (user) return { type: 'USER_REGISTERED', message: 'User already registered' };

  // cria o novo usuario
  const newUser = await User.create({ displayName, email, password, image });

  const { password: _, ...rest } = newUser;
  
  const token = jwtUtil.createToken(rest);

  return { type: null, message: token };
};

const getAll = async () => {
  const result = await User.findAll();

  return result.map((item) => {
    const { password: _, ...rest } = item.dataValues;
    return rest;
  });
};

const getById = async (id) => {
  const result = await User.findByPk(id);

  if (!result) return { type: 'USER_NOT_FOUND', message: 'User does not exist' };

  const { password: _, ...rest } = result.dataValues;
  return { type: null, message: rest };
};

module.exports = {
  validadeUser,
  createUser,
  getAll,
  getById,
};