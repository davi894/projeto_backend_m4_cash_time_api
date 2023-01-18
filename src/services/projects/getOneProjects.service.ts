import { AppDataSource } from "../../data-source";
import { Projects } from "../../entities/projects";
import AppError from "../../errors/AppError";

export const getOneProjectService = async (params) => {
  const projectsDatabase = AppDataSource.getRepository(Projects);
  const project = await projectsDatabase.findOneBy({
    id: params.project_id,
  });

  if (!project) {
    throw new AppError(404, "Project not found!");
  }

  
  return project;
};
