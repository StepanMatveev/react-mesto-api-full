const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { validateAddCard, validateCardId } = require('../middlewares/validation.js');

router.get('/', getCards);
router.post('/', validateAddCard, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);
router.put('/:cardId/likes', validateCardId, likeCard);

module.exports = router;
