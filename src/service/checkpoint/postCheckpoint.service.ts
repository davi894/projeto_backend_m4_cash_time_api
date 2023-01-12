import { ICheckpointPost } from "../../interfaces/checkpoint";
import { AppDataSource } from "../../data-source";
import { Checkpoint } from "../../entities/checkpoint";
import { Projects } from "../../entities/projects";
import { User } from "../../entities/user";

const servicePostCheckpoint = async (data: ICheckpointPost) => {
  const { project_id, user_id, entry, output, day } = data;

  const checkpointRepository = AppDataSource.getRepository(Checkpoint);
  const projectsRepository = AppDataSource.getRepository(Projects);
  const userRepository = AppDataSource.getRepository(User);

  const foundUserProjects = await userRepository
    .createQueryBuilder("users")
    .leftJoinAndSelect("users.projects_id", "projects")
    .where("projects.id = :id", { id: project_id })
    .andWhere("users.id = :id", { id: user_id })
    .getOne();

  return {
    user: {
      name: "",
      email: "",
      isActive: "",
      porject: {
        id: "",
        name: "",
        updatedAt: "",
        hourValue: "",
        status: "",
        totalValue: "",
        totalTime: "",
        checkpoints: {
          id: "",
          entry: "",
          output: "",
          day: "",
        },
      },
    },
  };
};

export { servicePostCheckpoint };
