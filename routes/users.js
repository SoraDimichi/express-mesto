const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const {
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getMyProfile,
} = require('../controllers/users');

const { validAuth, validUpdateProfile, validUpdateAvatar } = require('../middlewares/validators');

router.post('/signin', validAuth, login);
router.post('/signup', validAuth, createUser);

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getMyProfile);
router.patch('/users/me', auth, validUpdateProfile, updateProfile);
router.patch('/users/me/avatar', auth, validUpdateAvatar, updateAvatar);

module.exports = router;
