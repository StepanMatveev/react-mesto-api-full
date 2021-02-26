class ConflictError extends Error {
  constructor(message = 'Конфликт запроса') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
