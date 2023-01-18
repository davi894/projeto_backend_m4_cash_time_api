import { IProjectsRequest } from "../../interfaces/projects";
import { IUserLogin, IUserRequest } from "../../interfaces/users";
import {
  ICheckinRequest,
  ICheckinRequestUpdate,
} from "../../interfaces/checkpoint";
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
  description: "uma site para uma farmácia de grande porte, com delivery, centro de atendimento, cadastro e lgoin de usuários.",
  status: "",
  totalTime: ""
};

/* const mockedCheckpoint: ICheckinRequest = {
  entry: "8:20",
  exit: "",
  date: "2023/5/10",
  user_id: "",
  project_id: "",
};

const mockedCheckpointUpdate: ICheckinRequestUpdate = {
  entry: "8:20",
  exit: "",
  date: "2023/5/10",
}; */

export {
  mockedUser,
  mockedUserLogin,
  mockedSecondUser,
  mockedSecondUserLogin,
  mockedProject
  /* mockedCheckpoint,
  mockedCheckpointUpdate, */
};
