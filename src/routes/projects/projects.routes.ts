import { Router } from "express";

import { createProjectsController, deleteProjectsController, getOneProjectController, getTotalAllProjectsController, listProjectsController, listTotalOneProjectController, updateProjectsController } from "../../controllers/projects/projects.controller";
import { verifyErrorMiddleware } from "../../middlewares/verifyError.middleware";
import { projectSchema, updateProjectsSchema } from "../../serializers/projects/projects.serializers";


export const projectsRouter = Router()

projectsRouter.post("/",verifyErrorMiddleware(projectSchema),createProjectsController)
projectsRouter.get("/",listProjectsController)
projectsRouter.get("/:project_id/total",listTotalOneProjectController)
projectsRouter.get("/total",getTotalAllProjectsController)
projectsRouter.get("/:id",getOneProjectController)
projectsRouter.patch("/:id",verifyErrorMiddleware(updateProjectsSchema),updateProjectsController)
projectsRouter.delete("/:id",deleteProjectsController)

export default projectsRouter