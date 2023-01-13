import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user";
import AppError  from "../errors/AppError";

const ensureEmailNotUsedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email,
    },
    withDeleted: true,
  });

  if (user) {
    throw new AppError(409, "Email already used");
  }

  return next();
};

export default ensureEmailNotUsedMiddleware;
