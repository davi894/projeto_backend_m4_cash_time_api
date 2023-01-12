import { ICheckpointGEtId } from "../../interfaces/checkpoint";
import { AppDataSource } from "../../data-source";
import { Checkpoint } from "../../entities/checkpoint";
import { Projects } from "../../entities/projects";
import { User } from "../../entities/user";

const serviceGetIdCheckpoint = async (data: ICheckpointGEtId) => {
    
  const { project_id, user_id } = data;

  const checkpointRepository = AppDataSource.getRepository(Checkpoint);
  const projectsRepository = AppDataSource.getRepository(Projects);
  const userRepository = AppDataSource.getRepository(User);

  const foundUserProjects = await userRepository
    .createQueryBuilder("users")
    .leftJoinAndSelect("users.projects_id", "projects")
    .where("projects.id = :id", { id: project_id })
    .andWhere("users.id = :id", { id: user_id })
    .getOne();
};

export { serviceGetIdCheckpoint };
