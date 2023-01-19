import { Router } from "express";
import {
  midValidateProjectId,
  midValidateCheckpointId,
} from "../../middlewares/checkpoint";

import {
  createProjectsController,
  deleteProjectsController,
  getOneProjectController,
  getTotalAllProjectsController,
  listProjectsController,
  listTotalOneProjectController,
  updateProjectsController,
} from "../../controllers/projects/projects.controller";
import ensureAuthMiddleware from "../../middlewares/ensureAuth.middleware";
import { verifyErrorMiddleware } from "../../middlewares/verifyError.middleware";
import {
  projectSchema,
  updateProjectsSchema,
} from "../../serializers/projects/projects.serializers";

export const projectsRouter = Router();

projectsRouter.post(
  "/",
  ensureAuthMiddleware,
  verifyErrorMiddleware(projectSchema),
  createProjectsController
);

projectsRouter.get("/", ensureAuthMiddleware, listProjectsController);

projectsRouter.get(
  "/:project_id/total",
  ensureAuthMiddleware,
  midValidateProjectId,
  listTotalOneProjectController
);

projectsRouter.get(
  "/total",
  ensureAuthMiddleware,
  getTotalAllProjectsController
);

projectsRouter.get(
  "/:project_id",
  ensureAuthMiddleware,
  getOneProjectController
);

projectsRouter.patch(
  "/:project_id",
  ensureAuthMiddleware,
  verifyErrorMiddleware(updateProjectsSchema),
  updateProjectsController
);

projectsRouter.delete(
  "/:project_id",
  ensureAuthMiddleware,
  deleteProjectsController
);
