import { ICheckpointPost } from "../../interfaces/checkpoint";
import AppError from "../../errors/AppError";
import { AppDataSource } from "../../data-source";
import { Checkpoint } from "../../entities/checkpoint";
import { Projects } from "../../entities/projects";
import { User } from "../../entities/user";

const servicePostCheckpoint = async (data) => {
  const { project_id, user_id, entry, output, date } = data;

  const checkpointRepository =  AppDataSource.getRepository(Checkpoint);
  const projects = AppDataSource.getRepository(Projects);
  const user = AppDataSource.getRepository(User);

  const projectData = await projects.findOneByOrFail({
    id: data.project_id,
  });

  const userData = await user.findOneByOrFail({
    id: data.user_id,
  });

  console.log({
    userData: userData,
    projectData: projectData,
  });

  const creatCheckpoint = checkpointRepository.create({
    ...data,
  });

  await checkpointRepository.save(creatCheckpoint);

  return { message: "Checkpoint created!" };
};

export { servicePostCheckpoint };
