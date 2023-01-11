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

export { mockedUser, mockedUserLogin, mockedSecondUser, mockedSecondUserLogin };
