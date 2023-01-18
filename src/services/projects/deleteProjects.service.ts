import { AppDataSource } from "../../data-source";
import { Projects } from "../../entities/projects";

export const deleteProjectsService = async (params) => {
  const idProject = params.id;
  const projectsDatabase = AppDataSource.getRepository(Projects);
  await projectsDatabase.delete({ id: idProject });
  return {};
};
