import { Request, Response } from "express";
import { servicePostCheckpoint } from "../../service/checkpoint/postCheckpoint.service";
import {serializerReqCheckinPost} from "../../serializers/checkpoint"

const postCheckin = {
  project_id: "122",
  user_id: "sss",
  entry: "10:00",
  output: "11:00",
  date: "2000/12/10",
};

const controllerPostCheckpoint = async (req: Request, res: Response) => {

  const validatedCheckpointPost = await serializerReqCheckinPost.validate(
    postCheckin,
  );

  const data = await servicePostCheckpoint(validatedCheckpointPost);

  return res.status(201).json(data);
};

export  default controllerPostCheckpoint 
