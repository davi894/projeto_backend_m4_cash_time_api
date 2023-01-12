import { Router } from "express";

import { createProjectsController, getOneProjectController, listProjectsController, listTotalOneProjectController } from "../../controllers/projects/projects.controller";


export const projectsRouter = Router()

projectsRouter.post("/",createProjectsController)
projectsRouter.get("/",listProjectsController)

projectsRouter.get("/:project_id/total",listTotalOneProjectController)


projectsRouter.get("/:id",getOneProjectController)

