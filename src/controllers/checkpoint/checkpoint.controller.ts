import { Request, Response } from "express";
import { servicePostCheckpoint } from "../../services/checkpoint/postCheckpoint.service";
import {serializerReqCheckinPost} from "../../serializers/checkpoint"
import { serviceGetIdCheckpoint } from "../../services/checkpoint/getIdCheckpoint.service";
import { serializerReqCheckinGetId } from "../../serializers/checkpoint";
import { ICheckPointInterval } from "../../interfaces/checkpoint";
import getPeriodService from "../../services/checkpoint/getPeriod.service";
import patchCheckpointService from "../../services/checkpoint/patchCheckpoint.service";

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
      postCheckin,
    );
  
    const data = await servicePostCheckpoint(validatedCheckpointPost);
  
    return res.status(201).json(data);
};
  
export const controllerGetIdCheckpoint = async (req: Request, res: Response) => {
    const validatedCheckpointGetId = await serializerReqCheckinGetId.validate(
      getIdCheckin
    );
  
    const data = await serviceGetIdCheckpoint(validatedCheckpointGetId);
  
    return res.status(200).json(data);
};
  
export const getPeriodController = async (req: Request, res: Response) => {
    const period = req.params;
  
    const listUsers = await getPeriodService(reqBody);
  
    return res.status(200).json(listUsers);
};
  
export const patchCheckpointController = async (req: Request, res: Response) => {
    const finishCheckpoint = await patchCheckpointService(reqBody2);
  
    return res.status(200).json(finishCheckpoint);
};