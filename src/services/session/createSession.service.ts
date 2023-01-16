import { compare } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user";
import AppError from "../../errors/AppError";
import jwt from "jsonwebtoken";
import { IUserLogin } from "../../interfaces/users";

const createSessionService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError(403, "Email invalid");
  }

  if (!user.isActive) {
    throw new AppError(400, "User is not active");
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError(403, "password invalid");
  }

  const token = jwt.sign(
    {
      type: user.email,
    },
    process.env.SECRET_KEY,
    {
      subject: user.id,
      expiresIn: "24h",
    }
  );

  return token;
};

export default createSessionService;
