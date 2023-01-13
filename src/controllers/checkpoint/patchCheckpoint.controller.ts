import { Request, Response } from "express";
import patchCheckpointService from "../../service/checkpoint/patchCheckpoint.service";

const reqBody = {
  output: "11:00",
  checkpoint_id: "uuid",
  project_id: "122",
};

const patchCheckpointController = async (req: Request, res: Response) => {
  const finishCheckpoint = await patchCheckpointService(reqBody);

  return res.status(200).json(finishCheckpoint);
};

export default patchCheckpointController;
