import { AppDataSource } from "../../data-source";
import { Projects } from "../../entities/projects";

export const listProjectsService = async (userId: string) => {
  const projectsRepository = AppDataSource.getRepository(Projects);
  const projects = await projectsRepository.find({
    where: {
      user_: {
        id: userId,
      },
    },
  });
  return projects;
};
