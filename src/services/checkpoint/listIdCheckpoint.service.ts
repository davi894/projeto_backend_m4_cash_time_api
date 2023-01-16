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

  const checkpoint = await checkpointRepository.findOneByOrFail({
    id: checkpoint_id,
  });

  const projects = await projectsRepository.findOneByOrFail({
    id: checkpoint_id,
  });

  const user = await userRepository.findOneByOrFail({
    id: user_id,
  });

  const foundcheckpoint = await projectsRepository
    .createQueryBuilder("projects")
    .leftJoinAndSelect("projects.checkpoint_", "checkpoint")
    .where("checkpoint.id = :id", { id: checkpoint_id })
    .andWhere("projects.id = :id", { id: project_id })
    .getMany();

  console.log(foundcheckpoint, "foundcheckpoint");

  if (!projects) {
    throw new AppError(404, "Checkpoint not exist!");
  }

  if (!projects) {
    throw new AppError(404, "Checkpoint not exist!");
  }

  return { checkpoint: [{ ...checkpoint }] };
};

export { serviceGetIdCheckpoint };
