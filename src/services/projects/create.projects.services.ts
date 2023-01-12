import { AppDataSource } from "../../data-source";
import { Projects } from "../../entities/projects";
import AppError from "../../errors/AppError";
import { IProjectsRequest } from "../../interfaces/projects";

export const createProjectsService = async (projectsData: IProjectsRequest)=>{
    const projectsRepository = AppDataSource.getRepository(Projects)
    const projects = projectsRepository.create(projectsData)
    console.log(projects)
    
    

    await projectsRepository.save(projects)

    return [201,projects]
}