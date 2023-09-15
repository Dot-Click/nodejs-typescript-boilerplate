import { Request, Response, NextFunction } from "express";
import logger from "../functions/logger";

const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info({
    method: req.method,
    url: req.url,
    date: new Date(),
    message: "Request received",
  });
  next();
};

export default requestLoggerMiddleware;
