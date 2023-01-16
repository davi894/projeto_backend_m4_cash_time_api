import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Projects } from "../../entities/projects";
import AppError from "../../errors/AppError";

export const createProjectsService = async (dataProject, userId: string) => {
  const projectsData = dataProject;

  const projectsRepository = AppDataSource.getRepository(Projects);

  const findProjects = await projectsRepository.findOneBy({
    name: projectsData.name,
  });

  if (findProjects) {
    throw new AppError(409, "Project Already Exists");
  }

  const projects = projectsRepository.create({
    ...projectsData,
    user_: userId,
  });

  await projectsRepository.save(projects);

  return projects;
};
