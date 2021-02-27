const { celebrate, Joi, CelebrateError } = require('celebrate');
const { isURL } = require('validator');

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value) => {
      if (!isURL(value)) throw new CelebrateError('Некорректный URL');
      return value;
    }),
  }),
});

const validateAddCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value) => {
      if (!isURL(value)) throw new CelebrateError('Некорректный URL');
      return value;
    }),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

const validateUserData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

module.exports = {
  validateUserInfo,
  validateAvatar,
  validateAddCard,
  validateCardId,
  validateUserData,
};
