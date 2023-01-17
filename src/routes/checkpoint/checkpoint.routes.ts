import { Router } from "express";
import {
  midValidateProjectId,
  midValidateCheckpointId,
} from "../../middlewares/checkpoint";
import {
  controllerPostCheckpoint,
  controllerGetIdCheckpoint,
  getPeriodController,
  patchCheckpointController,
  getAllProjectsCheckpointController,
} from "../../controllers/checkpoint/checkpoint.controller";
import ensureAuthMiddleware from "../../middlewares/ensureAuth.middleware";

const routerCheckpoint = Router();

routerCheckpoint.post(
  "/:project_id",
  ensureAuthMiddleware,
  midValidateProjectId,
  controllerPostCheckpoint
);

routerCheckpoint.get(
  "/:project_id",
  ensureAuthMiddleware,
  midValidateProjectId,
  midValidateCheckpointId,
  controllerGetIdCheckpoint
);

routerCheckpoint.get("", ensureAuthMiddleware, getPeriodController);

routerCheckpoint.get(
  "/:project_id/all",
  midValidateProjectId,
  ensureAuthMiddleware,
  getAllProjectsCheckpointController
);

routerCheckpoint.patch(
  "/:project_id",
  ensureAuthMiddleware,
  midValidateProjectId,
  midValidateCheckpointId,
  patchCheckpointController
);

export default routerCheckpoint;
