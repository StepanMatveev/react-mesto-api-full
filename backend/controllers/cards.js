const Card = require('../models/card.js');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createCard = (req, res, next) => {
  const { _id: userId } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch(() => next(new BadRequestError()));
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалять чужие карточки');
      }
      card.remove()
        .then((removedCard) => res.send({ data: removedCard }));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const { _id: userId } = req.user;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const { _id: userId } = req.user;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => res.send({ data: card }))
    .catch(next);
};
