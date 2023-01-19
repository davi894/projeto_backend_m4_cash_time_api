import { AppDataSource } from "../../data-source";
import { Projects } from "../../entities/projects";

export const getTotalAllProjectsService = async (userId: string) => {
  const projectsDatabase = AppDataSource.getRepository(Projects);

  const projects = await projectsDatabase.find({
    where: {
      user_: {
        id: userId,
      },
    },
    select: {
      name: true,
      totalValue: true,
    },
  });

  return projects;
};
