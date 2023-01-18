import { IUserLogin, IUserRequest } from "../../interfaces/users";
import {
  ICheckinRequest,
  ICheckinRequestUpdate,
} from "../../interfaces/checkpoint";
import { IProjectsRequest } from "../../interfaces/projects";

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

const mockedProject: IProjectsRequest = {
  name: "Site de farmácia",
  hourValue: 12.0,
  totalValue: 4800.0,
  status: "em progresso",
  totalTime: "20h",
  description:
    "uma site para uma farmácia de grande porte, com delivery, centro de atendimento, cadastro e lgoin de usuários.",
};

const mockedCheckpoint: ICheckinRequest = {
  entry: "8:20",
  output: "",
  date: "2023/5/10",
};

const mockedCheckpointUpdate: ICheckinRequestUpdate = {
  output: "12:20",
};

const mockedUserCheckpoint: IUserRequest = {
  name: "Lucas",
  email: "lucas@mail.com",
  password: "1234",
};

const mockedUserLoginCheckpoint: IUserLogin = {
  email: "lucas@mail.com",
  password: "1234",
};

export {
  mockedUserLoginCheckpoint,
  mockedUserCheckpoint,
  mockedUser,
  mockedUserLogin,
  mockedSecondUser,
  mockedSecondUserLogin,
  mockedProject,
  mockedCheckpoint,
  mockedCheckpointUpdate,
};
