import { ICheckpointGEtId } from "../../interfaces/checkpoint";
import AppError from "../../errors/AppError";
import { AppDataSource } from "../../data-source";
import { Checkpoint } from "../../entities/checkpoint";
import { Projects } from "../../entities/projects";
import { User } from "../../entities/user";

const serviceGetIdCheckpoint = async (data: ICheckpointGEtId) => {
  const { project_id, user_id, checkpoint_id } = data;

  const checkpointRepository = AppDataSource.getRepository(Checkpoint);
  const projectsRepository = AppDataSource.getRepository(Projects);
  const userRepository = AppDataSource.getRepository(User);

  const foundcheckpoint =  await checkpointRepository
    .createQueryBuilder("checkpoint")
    .leftJoinAndSelect("checkpoint.projects_id", "projects")
    .where("projects.id = :id", { id: project_id })
    .andWhere("checkpoint.id = :id", { id: checkpoint_id })
    .andWhere("checkpoint.user_id  = :id", { id: user_id })
    .getOne(); 

    if (!foundcheckpoint) {
    throw new AppError(404, "Checkpoint not exist!");
  }
 
  return {
    checkpoint: [{ check1: "check1" }],
  };
};

export { serviceGetIdCheckpoint };
