import { AppDataSource } from "../../data-source";
import { Projects } from "../../entities/projects";
import AppError from "../../errors/AppError";
import { IProjectsRequest } from "../../interfaces/projects";

export const createProjectsService = async (projectsData: IProjectsRequest)=>{
    const projectsRepository = AppDataSource.getRepository(Projects)
    const projects = projectsRepository.create(projectsData)
    
    const findProjects = await projectsRepository.findOneBy({
        name:projectsData.name
    })
    
    if (findProjects){
        throw new AppError(409,"Project Already Exists")
    }
    
    await projectsRepository.save(projects)

    return projects
}