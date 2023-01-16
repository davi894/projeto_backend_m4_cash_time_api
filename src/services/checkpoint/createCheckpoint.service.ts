import { ICheckpointPost } from "../../interfaces/checkpoint";
import AppError from "../../errors/AppError";
import { AppDataSource } from "../../data-source";
import { Checkpoint } from "../../entities/checkpoint";
import { Projects } from "../../entities/projects";
import { User } from "../../entities/user";

const servicePostCheckpoint = async (data: any) => {
  const { project_id, user_id, entry, output, date } = data;

  const checkpointRepository = AppDataSource.getRepository(Checkpoint);
  const projects = AppDataSource.getRepository(Projects);
  const user = AppDataSource.getRepository(User);

  const projectData = await projects.findOneByOrFail({
    id: data.project_id,
  });

  const userData = await user.findOneByOrFail({
    id: data.user_id,
  });
  

  if (!projectData) {
    throw new AppError(404, "Project not found");
  }

  if (!userData) {
    throw new AppError(404, "User not found");
  }

  const creatCheckpoint = checkpointRepository.create({
    ...data,
    projects_: projectData.id,
    user_: userData.id,
  });

  await checkpointRepository.save(creatCheckpoint);

  return { message: "Checkpoint created!" };
};

export { servicePostCheckpoint };
