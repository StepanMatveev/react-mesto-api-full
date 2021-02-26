const router = require('express').Router();

const {
  getUsers, getUserMe, getUserById, editProfile, editAvatar,
} = require('../controllers/users');

const { validateUserInfo, validateAvatar } = require('../middlewares/validation.js');

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/:id', getUserById);
router.patch('/me', validateUserInfo, editProfile);
router.patch('/me/avatar', validateAvatar, editAvatar);

module.exports = router;
