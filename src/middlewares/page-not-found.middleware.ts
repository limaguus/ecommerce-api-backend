import type { Express, Request, Response, NextFunction } from "express";
import NotFoundError = require("../errors/not-found.error");

const pageNotFoundHandler = (app: Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError("Página não encontrada"));
  });
};

export = pageNotFoundHandler;