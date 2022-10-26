const Joi = require('joi');
const jwtUtil = require('../utils/jwt.utils');

const { User } = require('../models');

const validadeBody = (params) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
    }),
  });

  const { error, value } = schema.validate(params);

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

module.exports = {
  validadeBody,
  validateLogin,
};