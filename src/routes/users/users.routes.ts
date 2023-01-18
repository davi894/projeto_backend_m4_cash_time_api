import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  updateUserController,
} from "../../controllers/users/users.controllers";
import ensureAuthMiddleware from "../../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../../middlewares/ensureDataIsValid.middleware";
import ensureEmailNotUsedMiddleware from "../../middlewares/ensureEmailNotUsed.middleware";
import {
  createUserSerializer,
  userUpdateSerializer,
} from "../../serializers/users/users.serializers";

const usersRoutes = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(createUserSerializer),
  ensureEmailNotUsedMiddleware,
  createUserController
);
usersRoutes.get("", ensureAuthMiddleware, listUsersController);

usersRoutes.patch(
  "",
  ensureDataIsValidMiddleware(userUpdateSerializer),
  ensureAuthMiddleware,
  updateUserController
);
usersRoutes.delete("", ensureAuthMiddleware, deleteUserController);

export default usersRoutes;
