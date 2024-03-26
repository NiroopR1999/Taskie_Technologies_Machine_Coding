class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    switch (true) {
      case this instanceof BadRequest:
        return 400;
      case this instanceof Unauthorized:
        return 401;
      case this instanceof Forbidden:
        return 403;
      case this instanceof NotFound:
        return 404;
      case this instanceof BadGateway:
        return 502;
      case this instanceof ServiceUnavailable:
        return 503;
      default:
        return 500;
    }
  }
}

class BadRequest extends GeneralError {}
class Unauthorized extends GeneralError {}
class Forbidden extends GeneralError {}
class NotFound extends GeneralError {}
class BadGateway extends GeneralError {}
class ServiceUnavailable extends GeneralError {}

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
};
module.exports = {
  errorHandler,
  GeneralError,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  BadGateway,
  ServiceUnavailable,
};
