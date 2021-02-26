class BadRequestError extends Error {
  constructor(message = 'Неверный запрос') {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
