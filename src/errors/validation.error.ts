import ErrorBase = require("./base.error");

class ValidationError extends ErrorBase {
  constructor(message: string) {
    super(400, message);
  }
}

export = ValidationError;