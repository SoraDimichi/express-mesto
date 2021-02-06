const Card = require('../models/card');

const {
  ForbiddenError,
  NotFoundError,
} = require('../middlewares/errorHandler');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(next);

const createCard = (req, res, next) => Card.create(
  { name: req.body.name, link: req.body.link, owner: req.user.id },
)
  .then((card) => res.status(200).send(card))
  .catch(next);

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (req.user.id.toString() === card.owner.toString()) {
        Card.findByIdAndDelete(req.params.id).then((data) => res.send((data)));
      } else {
        throw new ForbiddenError('Не ваша катрочка');
      }
    }).catch(next);
};

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user.id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    return res.status(200).send(card);
  })
  .catch(next);

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user.id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    return res.status(200).send(card);
  })
  .catch(next);

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
