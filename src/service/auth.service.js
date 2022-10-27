const jwtUtil = require('../utils/jwt.utils');

// Models
const { User } = require('../models');

// Validations
const { schemaLogin, schemaUser } = require('../utils/validations');

const validadeBody = (params) => {
  const { error, value } = schemaLogin.validate(params);

  if (error) return error.message;

  return value;
};

const validadeUser = (params) => {
  const { error, value } = schemaUser.validate(params);

  if (error) return error.message;

  return value;
};

// valida se foi passado o email e password corretos e retornar o token
const validateLogin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return { type: 'Invalid fields', message: 'Invalid fields' };
  }

  const emailJwt = user.dataValues.email;

  const token = jwtUtil.createToken(emailJwt);

  return { type: null, message: token };
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

module.exports = {
  validadeBody,
  validateLogin,
  validadeUser,
  createUser,
};