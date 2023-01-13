import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user";
import  AppError  from "../../errors/AppError";
import { IUser } from "../../interfaces/users";
import { userSerializer } from "../../serializers/users.serializers";

const deleteUserService = async (userId: string): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (findUser.isActive === false) {
    throw new AppError(400, "User doesn't exists");
  }

  const user = await userRepository.save({
    ...findUser,
    isActive: false,
  });

  const userResponse = await userSerializer.validate(user, {
    stripUnknown: true,
  });

  return userResponse;
};

export default deleteUserService;