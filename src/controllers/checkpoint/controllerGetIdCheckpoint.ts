import { Request, Response } from "express";
import { serviceGetIdCheckpoint } from "../../service/checkpoint/serviceGetIdCheckpoint";
import { serializerReqCheckinGetId } from "../../serializers/checkpoint";

const getIdCheckin = {
  project_id: "122",
  user_id: "sss",
  checkpoint_id: "asas",
};

const controllerGetIdCheckpoint = async (req: Request, res: Response) => {
  const validatedCheckpointGetId = await serializerReqCheckinGetId.validate(
    getIdCheckin
  );

  const data = await serviceGetIdCheckpoint(validatedCheckpointGetId);

  return res.status(200).json(data);
};

export default controllerGetIdCheckpoint;
