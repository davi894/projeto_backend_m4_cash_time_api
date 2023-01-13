import { Request, Response, NextFunction } from "express";
import { Checkpoint } from "../../entities/checkpoint";
import { Projects } from "../../entities/projects";
import { User } from "../../entities/user";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";

const midValidateProjectId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const checkpointRepository = AppDataSource.getRepository(Checkpoint);
  const projectsRepository = AppDataSource.getRepository(Projects);
  const userRepository = AppDataSource.getRepository(User);

  const foundProjects = await projectsRepository
    .createQueryBuilder("projects")
    .innerJoinAndSelect("projects.user_id", "user")
    .where("user.id = :id", { id: req.body.user_id })
    .andWhere("projects.id = :id", { id: req.body.project_id })
    .getOne();

  if (!foundProjects) {
    throw new AppError(404, "Project not exist!");
  }

  next();
};

const midValidateCheckpointId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const checkpointRepository = AppDataSource.getRepository(Checkpoint);
  const projectsRepository = AppDataSource.getRepository(Projects);
  const userRepository = AppDataSource.getRepository(User);

  const foundProjects = await checkpointRepository
    .createQueryBuilder("checkpoint")
    .leftJoinAndSelect("checkpoint.projects_id", "projects")
    .where("projects.id = :id", { id: req.body.project_id })
    .andWhere("checkpoint.id = :id", { id: req.body.checkpoint_id })
    .andWhere("checkpoint.user_id  = :id", { id: req.body.user_id })
    .getOne();

  if (!foundProjects) {
    throw new AppError(404, "Checkpoint not exist!");
  }

  next();
};

export { midValidateProjectId, midValidateCheckpointId };
