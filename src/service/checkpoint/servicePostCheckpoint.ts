import { ICheckpointPost } from "../../interfaces/checkpoint";
import handlerError from "../../errors/handleError";
import AppError from "../../errors/AppError";
import { AppDataSource } from "../../data-source";
import { Checkpoint } from "../../entities/checkpoint";
import { Projects } from "../../entities/projects";
import { User } from "../../entities/user";

const servicePostCheckpoint = async (data: ICheckpointPost) => {
  const { project_id, user_id, entry, output, day } = data;

  const checkpointRepository = AppDataSource.getRepository(Checkpoint);
  const projectsRepository = AppDataSource.getRepository(Projects);
  const userRepository = AppDataSource.getRepository(User);

  const foundProjects = await projectsRepository
    .createQueryBuilder("projects")
    .innerJoinAndSelect("projects.user_id", "user")
    .where("user.id = :id", { id: user_id })
    .andWhere("projects.id = :id", { id: project_id })
    .getOne();

  if (!foundProjects) {
    throw new AppError(404, "Project not exist!");
  }

  const creatCheckpoint = checkpointRepository.create({
    
  });

  await checkpointRepository.save(creatCheckpoint);

  return { message: "Checkpoint created!" };
};

export { servicePostCheckpoint };
