const bcrypt = require('bcrypt');
const User = require('../models/user');

const { SALT_ROUNDS } = process.env;
const { getJWTToken } = require('../middlewares/getJWTToken');

const {
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
  ConflictError,
} = require('../middlewares/errorHandler');

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new UnauthorizedError('Должны быть заполнены Email и пароль');
  }

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new ConflictError('Неправильный логин');
      }
      return bcrypt.compare(password, user.password).then((isValidate) => {
        if (isValidate) {
          const token = getJWTToken({ id: user._id });
          return res.send({ token });
        }
        throw new ConflictError('Неправильный пароль');
      });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Переданы некорректные данные');
  }

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Такой пользователь уже существует');
      }
      return bcrypt.hash(password, Number(SALT_ROUNDS));
    })
    .then((cryptedPassword) => User.create({ email, password: cryptedPassword }))
    // eslint-disable-next-line no-shadow
    .then(({ _id, email }) => res.send({ _id, email }))
    .catch(next);
};

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch(next);

const getMyProfile = (req, res, next) => User.findById(req.user.id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    return res.status(200).send(user);
  })
  .catch(next);

const updateProfile = (req, res, next) => User.findByIdAndUpdate(
  { _id: req.user.id },
  { name: req.body.name, about: req.body.about },
  { new: true, runValidators: true },
)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    return res.status(200).send(user);
  })
  .catch(next);

const updateAvatar = (req, res, next) => User.findByIdAndUpdate(
  { _id: req.user.id },
  { avatar: req.body.avatar },
  { new: true, runValidators: true },
)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    return res.status(200).send(user);
  })
  .catch(next);

module.exports = {
  login,
  createUser,
  getUsers,
  updateProfile,
  updateAvatar,
  getMyProfile,
};
