import { AppDataSource } from "../../data-source";
import { Checkpoint } from "../../entities/checkpoint";

export const getAllProjectsCheckpointService = async (projectID: string) => {
  const project = AppDataSource.getRepository(Checkpoint);

  const list = await project.find({
    where: { projects_: !projectID },
  });

  return list;
};
