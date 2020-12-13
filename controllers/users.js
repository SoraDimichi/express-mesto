const User = require('../models/user');
const {
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require('../utils/errors');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch((err) => {
    switch (err.name) {
      default:
        return res.status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
    }
  });

const getProfile = (req, res) => User.findOne({ _id: req.params.id })
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    switch (err.name) {
      case 'CastError':
        return res.status(NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
      default:
        return res.status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
    }
  });

const createUser = (req, res) => User.create(req.body)
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    switch (err.name) {
      case 'ValidationError':
        return res.status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      default:
        return res.status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
    }
  });

const updateProfile = (req, res) => User.findByIdAndUpdate(
  { _id: req.user._id },
  { name: req.body.name, about: req.body.about },
  { new: true, runValidators: true },
)
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    switch (err.name) {
      case 'CastError':
        return res.status(NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
      case 'ValidationError':
        return res.status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      default:
        return res.status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
    }
  });

const updateAvatar = (req, res) => User.findByIdAndUpdate(
  { _id: req.user._id },
  { avatar: req.body.avatar },
  { new: true, runValidators: true },
)
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    switch (err.name) {
      case 'CastError':
        return res.status(NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
      case 'ValidationError':
        return res.status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      default:
        return res.status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
    }
  });

module.exports = {
  getUsers,
  getProfile,
  createUser,
  updateProfile,
  updateAvatar,
};
