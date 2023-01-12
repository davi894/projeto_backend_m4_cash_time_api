import { Router } from "express";
import { createProjectsController, listProjectsController } from "../../controllers/projects/projects.controller";


export const projectsRouter = Router()

projectsRouter.post("/",createProjectsController)
projectsRouter.get("/",listProjectsController)
projectsRouter.get("/:project_id/total")