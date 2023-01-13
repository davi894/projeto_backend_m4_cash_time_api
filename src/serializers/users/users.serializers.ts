import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IUser,
  IUserLogin,
  IUserRequest,
  IUserUpdate,
} from "../../interfaces/users";

const createUserSerializer: SchemaOf<IUserRequest> = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required(),
});

const userLoginSerializer: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const userUpdateSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
  email: yup.string().email(),
  name: yup.string(),
  password: yup.string(),
});

const userSerializer: SchemaOf<IUser> = yup.object().shape({
  id: yup.string(),
  name: yup.string(),
  email: yup.string(),
  createdAt: yup.date(),
  updatedAt: yup.date(),
});

export {
  createUserSerializer,
  userLoginSerializer,
  userSerializer,
  userUpdateSerializer,
};
