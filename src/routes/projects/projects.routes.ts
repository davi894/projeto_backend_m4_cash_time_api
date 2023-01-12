import { Router } from "express";

import { createProjectsController, deleteProjectsController, getOneProjectController, getTotalAllProjectsController, listProjectsController, listTotalOneProjectController } from "../../controllers/projects/projects.controller";


export const projectsRouter = Router()

projectsRouter.post("/",createProjectsController)
projectsRouter.get("/",listProjectsController)
projectsRouter.get("/:project_id/total",listTotalOneProjectController)
projectsRouter.get("/total",getTotalAllProjectsController)
projectsRouter.get("/:id",getOneProjectController)
projectsRouter.delete("/:id",deleteProjectsController)