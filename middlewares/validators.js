const { celebrate, Joi } = require('celebrate');

const validAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .min(5)
      .max(30),
    password: Joi.string()
      .required()
      .regex(RegExp(/^\S*$/))
      .min(4),
  }).unknown(true),
});

const validProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30),
    about: Joi.string()
      .min(2)
      .max(50),
  }).unknown(true),
});

const validAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .regex(RegExp(/^https?:\/\/(www\.)?[a-z0-9._~:/?#[\]@!$&'()*+,;=-]+#?$/i))
      .min(2)
      .max(200),
  }).unknown(true),
});

const validCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    link: Joi.string()
      .regex(RegExp(/^https?:\/\/(www\.)?[a-z0-9._~:/?#[\]@!$&'()*+,;=-]+#?$/i))
      .min(2)
      .required()
      .max(200),
  }),
});

const validId = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .length(24)
      .hex(),
  }),
});

module.exports = {
  validAuth,
  validProfile,
  validAvatar,
  validCard,
  validId,
};
