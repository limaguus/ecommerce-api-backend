import type { Express, Request, Response, NextFunction } from "express";
import ValidationError = require("../errors/validation.error");
import NotFoundError = require("../errors/not-found.error");
import InternalServerError = require("../errors/internal-server.error");

const errorHandler = (app: Express) => {
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ValidationError || error instanceof NotFoundError) {
      error.send(res);
    } else {
      new InternalServerError().send(res);
    }
  });
};

export = errorHandler;