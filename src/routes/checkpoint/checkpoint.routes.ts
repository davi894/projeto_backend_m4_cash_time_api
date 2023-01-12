import express from "express";
import { Router } from "express";
import controllerGetIdCheckpoint from "../../controllers/checkpoint/controllerGetIdCheckpoint";
import controllerPostCheckpoint from "../../controllers/checkpoint/controllerPostCheckpoint";
import {
  midValidateProjectId,
  midValidateCheckpointId,
} from "../../middlewares/checkpoint";

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

export default routerCheckpoint;
