import { Request, Response } from "express";
import { servicePostCheckpoint } from "../../services/checkpoint/createCheckpoint.service";
import { serializerReqCheckinPost } from "../../serializers/checkpoint/checkpoint.serializers";
import { serviceGetIdCheckpoint } from "../../services/checkpoint/listIdCheckpoint.service";
import { serializerReqCheckinGetId } from "../../serializers/checkpoint/checkpoint.serializers";
import { ICheckPointInterval } from "../../interfaces/checkpoint";
import getPeriodService from "../../services/checkpoint/listPeriod.service";
import patchCheckpointService from "../../services/checkpoint/patchCheckpoint.service";
import { ICheckinRequestUpdate } from "../../interfaces/checkpoint";

export const controllerPostCheckpoint = async (req: Request, res: Response) => {
  req.body.user_id = req.user.id;
  req.body.project_id = req.params.project_id;

  const data = await servicePostCheckpoint(req.body);

  return res.status(201).json(data);
};

export const controllerGetIdCheckpoint = async (
  req: Request,
  res: Response
) => {
  const data = await serviceGetIdCheckpoint(req.body);

  return res.status(200).json(data);
};

export const getPeriodController = async (req: Request, res: Response) => {
  const period = req.body;

  const listUsers = await getPeriodService(period);

  return res.status(200).json(listUsers);
};

export const patchCheckpointController = async (
  req: Request,
  res: Response
) => {
  const patchData: ICheckinRequestUpdate = {
    checkpoint_id: req.body.checkpoint_id,
    output: req.body.output,
    project_id: req.params.id,
  };

  const finishCheckpoint = await patchCheckpointService(patchData);

  return res.status(200).json(finishCheckpoint);
};
