import { AppDataSource } from "../../data-source"
import { Projects } from "../../entities/projects"



export const listTotalOneProjectsService = async (params)=>{
    const projectsRepository = AppDataSource.getRepository(Projects)
    const projects = await projectsRepository.findOneBy({
        id:params.project_id
    })
  
    const total = projects.hourValue * parseInt[projects.totalTime]
    return [200,total]    
    
    
}