const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const {
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getMyProfile,
  getUser,
} = require('../controllers/users');

const {
  validAuth,
  validProfile,
  validAvatar,
  validId,
} = require('../middlewares/validators');

router.post('/signin', validAuth, login);
router.post('/signup', validAuth, validProfile, validAvatar, createUser);

router.use(auth);
router.get('/users/me', getMyProfile);
router.get('/users/:id', validId, getUser);
router.get('/users', getUsers);
router.patch('/users/me', validProfile, updateProfile);
router.patch('/users/me/avatar', validAvatar, updateAvatar);

module.exports = router;
