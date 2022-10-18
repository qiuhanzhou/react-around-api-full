const { celebrate, Joi } = require('celebrate')
const validator = require('validator')

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value
  }
  return helpers.error('string.uri')
}

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.min': 'The minimum length of the "name" field is 2',
      'string.max': 'The maximum length of the "name" field is 30',
      'string.empty': 'The "name" field must be filled in',
    }),

    //validation value for the link property

    link: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The "link" field must be filled in',
      'string.uri': 'the "link" field must be a valid url',
    }),
  }),
})

module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'The minimum length of the "name" field is 2',
      'string.max': 'The maximum length of the "name" field is 30',
    }),

    about: Joi.string().min(2).max(30).messages({
      'string.min': 'The minimum length of the "about" field is 2',
      'string.max': 'The maximum length of the "about" field is 30',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'The "password" field must be filled in',
    }),
    email: Joi.string()
      .required()
      .email()
      .message('The "email" field must be a valid email')
      .messages({
        'string.empty': 'The "email" field must be filled in',
      }),
  }),
})

module.exports.validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('The "email" field must be a valid email')
      .messages({
        'string.empty': 'The "email" field must be filled in',
      }),

    password: Joi.string().required().messages({
      'string.empty': 'The "password" field must be filled in',
    }),
  }),
})
