import { Request, Response, NextFunction } from "express";
import { Projects } from "../../entities/projects";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import { Checkpoint } from "../../entities/checkpoint";

const midValidateProjectId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const projects = AppDataSource.getRepository(Projects);

  const projectData = projects.findOneByOrFail({
    id: req.params.project_id,
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
  const checkpointRepository = AppDataSource.getRepository(Checkpoint);

  const checkpointData = checkpointRepository.findOne({
    where: { id: req.body.checkpoint_id },
  });

  if (!checkpointData) {
    throw new AppError(404, "Checkpoint not exist!");
  }

  next();
};

export { midValidateProjectId, midValidateCheckpointId };
