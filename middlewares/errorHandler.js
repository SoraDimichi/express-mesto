// eslint-disable-next-line no-unused-vars,max-classes-per-file
class BadRequestError extends Error {
  constructor(message) {
    super();
    this.statusCode = 400;
    this.message = message;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super();
    this.statusCode = 401;
    this.message = message;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super();
    this.statusCode = 403;
    this.message = message;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.statusCode = 404;
    this.message = message;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super();
    this.statusCode = 409;
    this.message = message;
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super();
    this.statusCode = 500;
    this.message = message;
  }
}

module.exports = {
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};

// const {
//   UnauthorizedError,
//   BadRequestError,
//   ForbiddenError,
//   NotFoundError,
//   ConflictError,
//   InternalServerError,
// } = require('./middlewares/errorHandler');
