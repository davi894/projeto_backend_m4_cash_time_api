import { Router } from "express";

import { createProjectsController, getOneProjectController, getTotalAllProjectsController, listProjectsController, listTotalOneProjectController, updateProjectsController } from "../../controllers/projects/projects.controller";
import { verifyErrorMiddleware } from "../../middleware/verifyError.middleware";
import { projectSchema, updateProjectsSchema } from "../../schemas/projects.schemas";


export const projectsRouter = Router()

projectsRouter.post("/",verifyErrorMiddleware(projectSchema),createProjectsController)
projectsRouter.get("/",listProjectsController)
projectsRouter.get("/:project_id/total",listTotalOneProjectController)
projectsRouter.get("/total",getTotalAllProjectsController)
projectsRouter.get("/:id",getOneProjectController)
projectsRouter.patch("/:id",verifyErrorMiddleware(updateProjectsSchema),updateProjectsController)