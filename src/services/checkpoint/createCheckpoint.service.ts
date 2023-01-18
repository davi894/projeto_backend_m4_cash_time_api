import { ICheckpointPost } from "../../interfaces/checkpoint";
import AppError from "../../errors/AppError";
import { AppDataSource } from "../../data-source";
import { Checkpoint } from "../../entities/checkpoint";
import { Projects } from "../../entities/projects";
import { User } from "../../entities/user";

const servicePostCheckpoint = async (
  data: any,
  projectID: string,
  userId: string
) => {
  const checkpointRepository = AppDataSource.getRepository(Checkpoint);
  const projects = AppDataSource.getRepository(Projects);
  const user = AppDataSource.getRepository(User);

  const projectData = await projects.findOneByOrFail({
    id: projectID,
  });

  const userData = await user.findOneByOrFail({
    id: userId,
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

  return creatCheckpoint;
};

export { servicePostCheckpoint };
