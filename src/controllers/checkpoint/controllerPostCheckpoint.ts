import { Request, Response } from "express";
import { servicePostCheckpoint } from "../../service/checkpoint/postCheckpoint.service";

const aaa = {
  project_id: "122",
  user_id: "sss",
  entry: "10",
  output: "11",
  day: "2000/12/10",
};

const controllerPostCheckpoint = async (req: Request, res: Response) => {
  const data = await servicePostCheckpoint(aaa);

  return res.status(201).json(data);
};

export { controllerPostCheckpoint };
