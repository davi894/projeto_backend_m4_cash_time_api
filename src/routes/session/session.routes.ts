import { Router } from "express";
import { createSessionController } from "../../controllers/session/session.controller";
import ensureDataIsValidMiddleware from "../../middlewares/ensureDataIsValid.middleware";
import { userLoginSerializer } from "../../serializers/users/users.serializers";

const sessionRoutes = Router();

sessionRoutes.post(
  "",
  ensureDataIsValidMiddleware(userLoginSerializer),
  createSessionController
);

export default sessionRoutes;
