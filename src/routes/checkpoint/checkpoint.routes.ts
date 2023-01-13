import { Router } from "express";
import {
  midValidateProjectId,
  midValidateCheckpointId,
} from "../../middlewares/checkpoint";
import { controllerPostCheckpoint, controllerGetIdCheckpoint, getPeriodController, patchCheckpointController } from "../../controllers/checkpoint/checkpoint.controller";

const routerCheckpoint = Router();

routerCheckpoint.post(
  "/checkpoint/:project_id",
  midValidateProjectId,
  controllerPostCheckpoint
);

routerCheckpoint.get(
  "/checkpoint/:project_id",
  midValidateProjectId,
  midValidateCheckpointId,
  controllerGetIdCheckpoint
);

routerCheckpoint.get("", getPeriodController);

routerCheckpoint.patch("/:project_id", patchCheckpointController);

export default routerCheckpoint;
