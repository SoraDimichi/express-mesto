const Card = require('../models/card');

const NOT_FOUND = 404;
const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch((err) => {
    switch (err.name) {
      default:
        return res.status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
    }
  });

const createCard = (req, res) => Card.create(
  { name: req.body.name, link: req.body.link, owner: req.user._id },
)
  .then((card) => res.status(200).send(card))
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

const deleteCard = (req, res) => Card.findByIdAndRemove(
  { _id: req.params.cardId },
)
  .then((card) => {
    if (!card) {
      return res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
    }
    return res.status(200).send(card);
  })
  .catch((err) => {
    switch (err.name) {
      case 'CastError':
        return res.status(NOT_FOUND)
          .send({ message: 'Карточка не найдена' });
      default:
        return res.status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
    }
  });

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
    }
    return res.status(200).send(card);
  })
  .catch((err) => {
    switch (err.name) {
      case 'CastError':
        return res.status(NOT_FOUND)
          .send({ message: 'Карточка не найдена' });
      default:
        return res.status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
    }
  });

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
    }
    return res.status(200).send(card);
  })
  .catch((err) => {
    switch (err.name) {
      case 'CastError':
        return res.status(NOT_FOUND)
          .send({ message: 'Карточка не найдена' });
      default:
        return res.status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
    }
  });

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
