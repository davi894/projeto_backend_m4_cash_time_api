import AppError from "../../errors/AppError";
import { AppDataSource } from "../../data-source";
import { Checkpoint } from "../../entities/checkpoint";
import { Projects } from "../../entities/projects";
import { User } from "../../entities/user";
import { ICheckPointInterval } from "../../interfaces/checkpoint";

const getPeriodService = async (periodData: ICheckPointInterval) => {
  const checkpoints = AppDataSource.getRepository(Checkpoint);
  const projects = AppDataSource.getRepository(Projects);
  const users = AppDataSource.getRepository(User);

  const { project_id, user_id, initialRange, finalInterval } = periodData;

  const foundPeriod = await checkpoints
    .createQueryBuilder("checkpoint")
    .leftJoinAndSelect("checkpoint.projects_id", "projects")
    .where("projects.id = :id", { id: project_id })
    .andWhere("checkpoint.user_id  = :id", { id: user_id })
    .getOne();

  if (!foundPeriod) {
    throw new AppError(404, "Period not found!");
  }

  return;
};

export default getPeriodService;
