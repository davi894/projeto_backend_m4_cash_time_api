import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Projects } from "../../entities/projects";
import AppError from "../../errors/AppError";

export const createProjectsService = async (req: Request)=>{
    const projectsData = req.body
    const {id} = req.user
    const projectsRepository = AppDataSource.getRepository(Projects)
   
    const projects = projectsRepository.create({...projectsData,user_:{id}})
    
    const findProjects = await projectsRepository.findOneBy({
        name:projectsData.name
    })
    if (findProjects){
        throw new AppError(409,"Projects Alheady Exists")
    }
    await projectsRepository.save(projects)

    return [201,projects]
}