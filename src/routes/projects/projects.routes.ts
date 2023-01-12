import { Router } from "express";
import { createProjectsController } from "../../controllers/projects/projects.controller";


export const projectsRouter = Router()

projectsRouter.post("/",createProjectsController)