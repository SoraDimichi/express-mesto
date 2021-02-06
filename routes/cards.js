const router = require('express').Router();
const { auth } = require('../middlewares/auth');

const { validCard, validId } = require('../middlewares/validators');

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.use(auth);
router.get('/cards', getCards);
router.delete('/cards/:id', validId, deleteCard);
router.post('/cards', validCard, createCard);

router.put('/cards/:id/likes', validId, likeCard);
router.delete('/cards/:id/likes', validId, dislikeCard);

module.exports = router;
