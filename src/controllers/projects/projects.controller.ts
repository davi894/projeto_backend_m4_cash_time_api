import { createProjectsService } from "../../services/projects/createProjects.service";
import { Request, Response } from "express";
import { listProjectsService } from "../../services/projects/listProjects.service";
import { getOneProjectService } from "../../services/projects/getOneProjects.service";
import { listTotalOneProjectsService } from "../../services/projects/listTotalOneProject.service";
import { getTotalAllProjectsService } from "../../services/projects/getTotalAllProjects.service";
import { updateProjectsService } from "../../services/projects/updateProjects.service";
import { deleteProjectsService } from "../../services/projects/deleteProjects.service";

export const createProjectsController = async (
  request: Request,
  response: Response
) => {
  const json = await createProjectsService(request.body, request.user.id);
  return response.status(201).json(json);
};

export const listProjectsController = async (
  request: Request,
  response: Response
) => {
  const json = await listProjectsService();
  return response.status(200).json(json);
};

export const listTotalOneProjectController = async (
  request: Request,
  response: Response
) => {
  const json = await listTotalOneProjectsService(request.params.project_id);
  return response.status(200).json(json);
};

export const getOneProjectController = async (
  request: Request,
  response: Response
) => {
  const json = await getOneProjectService(request.params);
  return response.status(200).json(json);
};

export const getTotalAllProjectsController = async (
  request: Request,
  response: Response
) => {
  const json = await getTotalAllProjectsService();
  return response.status(200).json(json);
};

export const updateProjectsController = async (
  request: Request,
  response: Response
) => {
  const json = await updateProjectsService(request.body, request.params.project_id);
  return response.status(200).json(json);
};

export const deleteProjectsController = async (
  request: Request,
  response: Response
) => {
  const json = await deleteProjectsService(request.params);
  return response.status(204).json(json);
};
