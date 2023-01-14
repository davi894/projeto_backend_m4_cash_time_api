import { IProjectRequest } from "../../interfaces/project";
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

const mockedProject: IProjectRequest = {
  name: "Site de farmácia",
  hour_value: 12.0,
  total_value: 4800.0,
  description:
    "uma site para uma farmácia de grande porte, com delivery, centro de atendimento, cadastro e lgoin de usuários.",
};

const mockedCheckpoint: ICheckinRequest = {
  entry: "8:20",
  output: "",
  date: "2023/5/10",
  user_id: "",
  project_id: "",
};

const mockedCheckpointUpdate: ICheckinRequestUpdate = {
  project_id: "",
  output: "12:20",
  checkpoint_id: "",
};

export {
  mockedUser,
  mockedUserLogin,
  mockedSecondUser,
  mockedSecondUserLogin,
  mockedProject,
  mockedCheckpoint,
  mockedCheckpointUpdate,
};
