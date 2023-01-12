import { IProjectRequest } from "../../interfaces/project";
import { IUserLogin, IUserRequest } from "../../interfaces/user";

const mockedUser: IUserRequest = {
  name: "maria",
  email: "maria@mail.com",
  password: "1234",
};

const mockedUserLogin: IUserLogin = {
  email: "maria@mail.com",
  password: "1234",
};

const mockedSecondUser: IUserRequest = {
  name: "marcos",
  email: "marcos@mail.com",
  password: "12345678",
};

const mockedSecondUserLogin: IUserLogin = {
  email: "marcos@mail.com",
  password: "12345678",
};

const mockedProject: IProjectRequest = {
  name: "Site de farmácia",
  hour_value: 12.00,
  total_value: 4800.00,
  description:
    "uma site para uma farmácia de grande porte, com delivery, centro de atendimento, cadastro e lgoin de usuários.",
};

export {
  mockedUser,
  mockedUserLogin,
  mockedSecondUser,
  mockedSecondUserLogin,
  mockedProject,
};
