import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user";
import { IUser, IUserRequest } from "../../interfaces/users";
import { userSerializer } from "../../serializers/users.serializers";

const createUserService = async (userData: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const newUser = userRepository.create(userData);
  await userRepository.save(newUser);

  const newUserResponse = await userSerializer.validate(newUser, {
    stripUnknown: true,
  });

  return newUserResponse;
};

export default createUserService;
