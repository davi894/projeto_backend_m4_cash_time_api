import { AppDataSource } from "../../data-source";
import { Checkpoint } from "../../entities/checkpoint";

export const getAllProjectsCheckpointService = async (projectID: string) => {
  const checkpointRepository = AppDataSource.getRepository(Checkpoint);

  const list = await checkpointRepository.find({
    where: {
      projects_: {
        id: projectID,
      },
    },
  });

  return list;
};
