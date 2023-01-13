import { Router } from "express";
import { createSessionController } from "../controllers/session.controller";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { userLoginSerializer } from "../serializers/users.serializers";

const sessionRoutes = Router();

sessionRoutes.post(
  "",
  ensureDataIsValidMiddleware(userLoginSerializer),
  createSessionController
);

export default sessionRoutes;
