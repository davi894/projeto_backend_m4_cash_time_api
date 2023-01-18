import { ICheckpointGEtId } from "../../interfaces/checkpoint";
import AppError from "../../errors/AppError";
import { AppDataSource } from "../../data-source";
import { Checkpoint } from "../../entities/checkpoint";

const serviceGetIdCheckpoint = async (
  data: ICheckpointGEtId,
  userId: string,
  projectID: string
) => {
  const checkpointRepository = AppDataSource.getRepository(Checkpoint);
 
  const checkpointData = await checkpointRepository.findOne({
    where: { id: data.checkpoint_id },
  });

  return checkpointData;
};

export { serviceGetIdCheckpoint };
