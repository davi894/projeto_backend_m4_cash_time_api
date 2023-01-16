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
  const projects = AppDataSource.getRepository(Projects);

  const projectData = projects.findOneByOrFail({
    id: req.body.project_id,
  });

  if (!projectData) {
    throw new AppError(404, "Project not exist!");
  }

  next();
};

const midValidateCheckpointId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const checkpointRepository = AppDataSource.getRepository(Projects);

  const checkpointData = checkpointRepository.findOne({
    where: { id: req.params.project_id },
    relations: { checkpoint_: true },
  });

  if (!checkpointData) {
    throw new AppError(404, "Checkpoint not exist!");
  }

  next();
};

export { midValidateProjectId, midValidateCheckpointId };
