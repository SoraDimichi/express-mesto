const { celebrate, Joi } = require('celebrate');

const validAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .min(5)
      .max(30),
    password: Joi
      .string()
      .required()
      .min(4),
  }),
});

const validUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(50),
  }).unknown(true),
});

const validUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(2)
      .max(200),
  }),
});

const validCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().min(2)
      .max(200),
  }).unknown(true),
});

module.exports = {
  validAuth,
  validUpdateProfile,
  validUpdateAvatar,
  validCreateCard,
};
