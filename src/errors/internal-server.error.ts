import ErrorBase = require("./base.error");

class InternalServerError extends ErrorBase {
  constructor(message = "Erro interno do servidor") {
    super(500, message);
  }
}

export = InternalServerError;