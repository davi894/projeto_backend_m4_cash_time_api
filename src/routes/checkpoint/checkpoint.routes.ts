import express from "express";
import { Router } from "express";
import controllerGetIdCheckpoint from "../../controllers/checkpoint/controllerGetIdCheckpoint";
import controllerPostCheckpoint from "../../controllers/checkpoint/controllerPostCheckpoint";
import {
  midValidateProjectId,
  midValidateCheckpointId,
} from "../../middlewares/checkpoint";
import getPeriodController from "../../controllers/checkpoint/getPeriod.controller";
import patchCheckpointController from "../../controllers/checkpoint/patchCheckpoint.controller";

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

routerCheckpoint.get("/checkpoint", getPeriodController);

routerCheckpoint.patch("/checkpoint/:project_id", patchCheckpointController);

export default routerCheckpoint;
