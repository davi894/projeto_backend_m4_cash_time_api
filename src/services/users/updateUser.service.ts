import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user";
import { IUser, IUserUpdate } from "../../interfaces/users";
import { userSerializer } from "../../serializers/users.serializers";

const updateUserService = async (
  userData: IUserUpdate,
  userId: string
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const updatedUser = userRepository.create({
    ...findUser,
    ...userData,
  });
  await userRepository.save(updatedUser);
  const userResponse = await userSerializer.validate(updatedUser, {
    stripUnknown: true,
  });

  return userResponse;
};

export default updateUserService;
