import { Request, Response } from "express";
import { servicePostCheckpoint } from "../../services/checkpoint/createCheckpoint.service";
import { serializerReqCheckinPost } from "../../serializers/checkpoint/checkpoint.serializers";
import { serviceGetIdCheckpoint } from "../../services/checkpoint/listIdCheckpoint.service";
import { serializerReqCheckinGetId } from "../../serializers/checkpoint/checkpoint.serializers";
import { ICheckPointInterval } from "../../interfaces/checkpoint";
import getPeriodService from "../../services/checkpoint/listPeriod.service";
import { getAllProjectsCheckpointService } from "../../services/checkpoint/getAllProjectsCheckpointService.service";
import patchCheckpointService from "../../services/checkpoint/patchCheckpoint.service";
import { ICheckinRequestUpdate } from "../../interfaces/checkpoint";

export const controllerPostCheckpoint = async (req: Request, res: Response) => {
  const data = await servicePostCheckpoint(
    req.body,
    req.params.project_id,
    req.user.id
  );

  return res.status(201).json(data);
};

export const controllerGetIdCheckpoint = async (
  req: Request,
  res: Response
) => {
  const data = await serviceGetIdCheckpoint(
    req.body,
    req.params.project_id,
    req.user.id
  );

  return res.status(200).json(data);
};

export const getPeriodController = async (req: Request, res: Response) => {
  const period = req.body;

  const listUsers = await getPeriodService(
    period,
    req.params.project_id,
    req.user.id
  );

  return res.status(200).json(listUsers);
};

export const patchCheckpointController = async (
  req: Request,
  res: Response
) => {
  
  const finishCheckpoint = await patchCheckpointService(
    req.body,
    req.params.project_id
  );

  return res.status(200).json(finishCheckpoint);
};

export const getAllProjectsCheckpointController = async (
  req: Request,
  res: Response
) => {
  const data = await getAllProjectsCheckpointService(req.params.project_id);

  return res.status(200).json(data);
};
