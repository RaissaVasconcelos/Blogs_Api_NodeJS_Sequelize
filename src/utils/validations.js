const Joi = require('joi');

const fieldRequired = 'Some required fields are missing';

const schemaLogin = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': fieldRequired,
    'string.empty': fieldRequired,
  }),
  password: Joi.string().required().messages({
    'any.required': fieldRequired,
    'string.empty': fieldRequired,
  }),
});

const schemaUser = Joi.object({
      displayName: Joi.string().required().min(8).messages({
        'string.empty': fieldRequired,
        'string.min': '"displayName" length must be at least 8 characters long',
      }),
      email: Joi.string().email().required().messages({
        'string.empty': fieldRequired,
      }),
      password: Joi.string().min(6).required().messages({
        'string.empty': fieldRequired,
        'string.min': '"password" length must be at least 6 characters long',
      }),
      image: Joi.string(),
    });

const schemaPost = Joi.object({
      title: Joi.string().required().messages({
        'string.empty': fieldRequired,
      }),
      content: Joi.string().required().messages({
        'string.empty': fieldRequired,
      }),
      categoryIds: Joi.array().length(2).required()
      .messages({
        'any.required': 'one or more "categoryIds" not found',
        'array.length': 'one or more "categoryIds" not found',
      }),
    });

const schemaEdited = Joi.object({
      title: Joi.string().required().messages({
        'string.empty': fieldRequired,
      }),
      content: Joi.string().required().messages({
        'string.empty': fieldRequired,
      }),
    }); 

module.exports = {
  schemaLogin,
  schemaUser,
  schemaPost,
  schemaEdited,
};