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

const createUser = async ({ email, displayName }) => {
  console.log(email);
  const user = await User.findOne({ where: { email } });
  console.log(user);

  if (!user) return { type: 'User already registered', message: 'User already registered' };

  const token = jwtUtil.createToken(displayName);

  return { type: null, message: token };
};

module.exports = {
  validadeBody,
  validateLogin,
  validadeUser,
  createUser,
};