import { Request, Response } from "express";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUserService from "../services/users/listUser.service";
import updateUserService from "../services/users/updateUser.service";

const createUserController = async (req: Request, res: Response) => {
  const userData = req.body;
  const newUser = await createUserService(userData);
  return res.status(201).json(newUser);
};

const listUsersController = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const user = await listUserService(userId);
  return res.status(200).json(user);
};

const updateUserController = async (req: Request, res: Response) => {
  const userData = req.body;
  const userId = req.user.id;
  const updatedUser = await updateUserService(userData, userId);
  return res.status(200).json(updatedUser);
};

const deleteUserController = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const deletedUser = await deleteUserService(userId);
  return res.status(204).json(deletedUser);
};

export {
  createUserController,
  listUsersController,
  updateUserController,
  deleteUserController,
};
