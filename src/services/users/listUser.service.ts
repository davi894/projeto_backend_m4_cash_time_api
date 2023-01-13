import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user";
import { IUser } from "../../interfaces/users";
import { userSerializer } from "../../serializers/users/users.serializers";


const listUserService = async (userId: string): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const userResponse = await userSerializer.validate(user, {
    stripUnknown: true,
  });

  return userResponse;
};

export default listUserService;
