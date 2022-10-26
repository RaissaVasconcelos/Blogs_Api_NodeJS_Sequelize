const jwtUtil = require('../utils/jwt.utils');

// Models
const { User } = require('../models');

// Validations
const { schemaLogin } = require('../utils/Validations');

const validadeBody = (params) => {
  const { error, value } = schemaLogin.validate(params);

  if (error) return error.message;

  return value;
};

// const validadeUser = (params) => {
//   const schema = Joi.object({
//     displayName: Joi.string().required().min(8).messages({
//       'string.empty': 'Some required fields are missing',
//       'string.min': 'displayName length must be at least 8 characters long',
//     }),
//     email: Joi.string().email().required().messages({
//       'string.empty': 'Some required fields are missing',
//     }),
//     password: Joi.string().min(6).required().messages({
//       'string.empty': 'Some required fields are missing',
//       'string.min': 'password length must be at least 6 characters long',
//     }),
//     image: Joi.string(),
//   });

//   const { error, value } = schema.validate(params);

//   if (error) return error.message;

//   return value;

// };

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
  // validadeUser,
};