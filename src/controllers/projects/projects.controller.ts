import { createProjectsService } from "../../services/projects/create.projects.services"
import { Request,Response } from "express"


export const createProjectsController = async (request:Request, response:Response)=>{
    const [status,json] = await createProjectsService(request.body)
    return response.status(status as number).json(json)
}