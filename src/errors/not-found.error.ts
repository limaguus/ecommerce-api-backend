import ErrorBase = require("./base.error");

class NotFoundError extends ErrorBase {
  constructor(message: string) {
    super(404, message);
  }
}

export = NotFoundError;