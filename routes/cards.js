const router = require('express').Router();
const { auth } = require('../middlewares/auth');

const { validCreateCard } = require('../middlewares/validators');

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', auth, getCards);
router.delete('/cards/:cardId', auth, deleteCard);
router.post('/cards', auth, validCreateCard, createCard);

router.put('/cards/:cardId/likes', auth, likeCard);
router.delete('/cards/:cardId/likes', auth, dislikeCard);

module.exports = router;
