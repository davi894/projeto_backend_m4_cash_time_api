import { AppDataSource } from "../../data-source";
import { Projects } from "../../entities/projects";

export const listProjectsService = async () => {
  const projectsRepository = AppDataSource.getRepository(Projects);
  const projects = await projectsRepository.find();
  return projects;
};
