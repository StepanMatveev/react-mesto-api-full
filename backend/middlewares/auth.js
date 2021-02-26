const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { TOKEN_SECRET_KEY = 'token-secret-key' } = process.env;

module.exports = (req, res, next) => {
  const { authorization = '' } = req.headers;

  if (!authorization && !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError());
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, TOKEN_SECRET_KEY);
  } catch (err) {
    next(new UnauthorizedError());
  }

  req.user = payload;
  return next();
};
