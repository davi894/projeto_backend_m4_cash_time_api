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
} from "../../controllers/checkpoint/checkpoint.controller";
import ensureAuthMiddleware from "../../middlewares/ensureAuth.middleware";

const routerCheckpoint = Router();

routerCheckpoint.post(
  "/:project_id",
  ensureAuthMiddleware,
/*   midValidateProjectId,
 */  controllerPostCheckpoint
);

routerCheckpoint.get(
  "/:project_id",
  ensureAuthMiddleware,
  /* midValidateProjectId,
  midValidateCheckpointId, */
  controllerGetIdCheckpoint
);

routerCheckpoint.get("", ensureAuthMiddleware, getPeriodController);

routerCheckpoint.patch(
  "/:project_id",
  ensureAuthMiddleware,
  patchCheckpointController
);

export default routerCheckpoint;
