const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');

const { TOKEN_SECRET_KEY = 'token-secret-key' } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => {
          const withoutPas = user;
          withoutPas.password = '';
          res.send(withoutPas);
        })
        .catch((err) => {
          if (err.name === 'MongoError' && err.code === 11000) {
            next(new ConflictError('Пользователь с таким емейл уже есть зарегестрирован'));
          }
          next(err);
        });
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new NotFoundError())
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getUserMe = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .orFail(new NotFoundError())
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.editProfile = (req, res, next) => {
  const { _id: userId } = req.user;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError())
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.editAvatar = (req, res, next) => {
  const { _id: userId } = req.user;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError())
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        TOKEN_SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => next(new UnauthorizedError('Неверный email или пароль')));
};
