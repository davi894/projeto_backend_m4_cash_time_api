import { createProjectsService } from "../../services/projects/create.projects.services"
import { Request,Response } from "express"
import { listProjectsService } from "../../services/projects/list.projects.services"
import { getOneProjectService } from "../../services/projects/getOne.projects.services"
import { listTotalOneProjectsService } from "../../services/projects/list.totalOneProject.services"
import { getTotalAllProjectsService } from "../../services/projects/getTotalAll.projects.services"
import { updateProjectsService } from "../../services/projects/update.projects.services"
import { deleteProjectsService } from "../../services/projects/delete.projects.services"



export const createProjectsController = async (request:Request, response:Response)=>{
    const [status,json] = await createProjectsService(request)
    return response.status(status as number).json(json)
}

export const listProjectsController = async (request:Request, response:Response)=>{
    const [status,json] = await listProjectsService()
    return response.status(status as number).json(json)
}

export const listTotalOneProjectController = async (request:Request, response:Response)=>{
    const [status,json] = await listTotalOneProjectsService(request.params)
    return response.status(status as number).json(json)
}

export const getOneProjectController = async (request:Request, response:Response)=>{
    const [status,json] = await getOneProjectService(request.params)
    return response.status(status as number).json(json)
}

export const getTotalAllProjectsController = async (request:Request, response:Response)=>{
    const [status,json] = await getTotalAllProjectsService()
    return response.status(status as number).json(json)
}

export const updateProjectsController = async (request:Request, response:Response)=>{
    const [status] = await updateProjectsService(request.body,request.params.id)
    return response.status(status as number).json({message: "projeto atualizado com sucesso"})
}

export const deleteProjectsController = async (request:Request, response:Response)=>{
    const[status,json] = await deleteProjectsService(request.params)
    return response.status(status as number).json(json)
}