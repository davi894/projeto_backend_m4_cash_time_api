import { ICheckpointPost } from "../../interfaces/checkpoint";
import AppError from "../../errors/AppError";
import { AppDataSource } from "../../data-source";
import { Checkpoint } from "../../entities/checkpoint";
import { Projects } from "../../entities/projects";
import { User } from "../../entities/user";

const servicePostCheckpoint = async (data: ICheckpointPost) => {
  const { project_id, user_id, entry, output, date } = data;

  const checkpointRepository = AppDataSource.getRepository(Checkpoint);
  const projects = await AppDataSource.getRepository(Projects).findOne({
    where: { id: project_id },
  });
  const user = await AppDataSource.getRepository(User).findOne({
    where: { id: user_id },
  });

  const creatCheckpoint = checkpointRepository.create({
    projects_: projects,
    user_: user,
    date: date,
    entry: entry,
  });

  await checkpointRepository.save(creatCheckpoint);

  return { message: "Checkpoint created!" };
};

export { servicePostCheckpoint };
