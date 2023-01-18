import { AppDataSource } from "../../data-source";
import { Projects } from "../../entities/projects";
import AppError from "../../error/AppError";
import { IProjectsUpdate } from "../../interfaces/projects";

export const updateProjectsService = async (
  projectsData: IProjectsUpdate,
  id: string
) => {
  const projectsRepository = AppDataSource.getRepository(Projects);
  const findProjects = await projectsRepository.findOneBy({
    id: id,
  });
  if (!findProjects) {
    throw new AppError(404, "Not Valid ID");
  }
  const projects = await projectsRepository.update(id, {
    name: projectsData.name,
    status: projectsData.status,
    hourValue: projectsData.hourValue,
    description: projectsData.description,
  });

  return { message: "Successfully updated project" };
};
