import { Router } from "express";

import { createProjectsController, deleteProjectsController, getOneProjectController, getTotalAllProjectsController, listProjectsController, listTotalOneProjectController, updateProjectsController } from "../../controllers/projects/projects.controller";
import ensureAuthMiddleware from "../../middlewares/ensureAuth.middleware";
import { verifyErrorMiddleware } from "../../middlewares/verifyError.middleware";
import { projectSchema, updateProjectsSchema } from "../../serializers/projects/projects.serializers";


export const projectsRouter = Router()

projectsRouter.post("/",ensureAuthMiddleware,verifyErrorMiddleware(projectSchema),createProjectsController)
projectsRouter.get("/",ensureAuthMiddleware,listProjectsController)
projectsRouter.get("/:project_id/total",ensureAuthMiddleware,listTotalOneProjectController)
projectsRouter.get("/total",ensureAuthMiddleware,getTotalAllProjectsController)
projectsRouter.get("/:id",ensureAuthMiddleware,getOneProjectController)
projectsRouter.patch("/:id",ensureAuthMiddleware,verifyErrorMiddleware(updateProjectsSchema),updateProjectsController)
projectsRouter.delete("/:id",ensureAuthMiddleware,deleteProjectsController)
