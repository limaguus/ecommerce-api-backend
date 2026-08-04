import type { Response } from "express";

class ErrorBase extends Error {
  constructor(
    private status: number,
    message: string
  ) {
    super(message);
  }

  send(res: Response) {
    res.status(this.status).send({
        message: this.message, });
  }
}

export = ErrorBase;