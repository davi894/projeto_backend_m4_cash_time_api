import { Request, Response } from "express";
import { servicePostCheckpoint } from "../../services/checkpoint/postCheckpoint.service";
import { serializerReqCheckinPost } from "../../serializers/checkpoint";
import { serviceGetIdCheckpoint } from "../../services/checkpoint/getIdCheckpoint.service";
import { serializerReqCheckinGetId } from "../../serializers/checkpoint";
import { ICheckPointInterval } from "../../interfaces/checkpoint";
import getPeriodService from "../../services/checkpoint/getPeriod.service";
import patchCheckpointService from "../../services/checkpoint/patchCheckpoint.service";
import { ICheckinRequestUpdate } from "../../interfaces/checkpoint";

const postCheckin = {
  project_id: "122",
  user_id: "sss",
  entry: "10:00",
  output: "11:00",
  date: "2000/12/10",
};

const getIdCheckin = {
  project_id: "122",
  user_id: "sss",
  checkpoint_id: "asas",
};

const reqBody = {
  initialRange: "2020/12/19",
  finalInterval: "2021/12/19",
  project_id: "string",
  user_id: "string",
};

const reqBody2 = {
  output: "11:00",
  checkpoint_id: "uuid",
  project_id: "122",
};

export const controllerPostCheckpoint = async (req: Request, res: Response) => {
  const validatedCheckpointPost = await serializerReqCheckinPost.validate(
    req.body
  );

  const data = await servicePostCheckpoint(validatedCheckpointPost);

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
