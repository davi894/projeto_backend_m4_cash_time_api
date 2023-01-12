import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";

const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  return res.status(500).send({ message: err.message });
};

export default handleError;
