import { AppDataSource } from "../../data-source";
import { Projects } from "../../entities/projects";
import {splitHour} from "../../utils/index"

export const listTotalOneProjectsService = async (params) =>{
    const projectsRepository = AppDataSource.getRepository(Projects)
    const projects = await projectsRepository.findOneBy({
        id:params.project_id
    })

    let projectTime = splitHour(projects.totalTime)
    
    let total = projects.hourValue * projectTime[0]
    let percentualMinutes = ((100 * projectTime[1]) / 60)
    total = total + ((projects.hourValue * percentualMinutes) / 100)
    

    return {"Total Value": total.toFixed(2)} 
       
}
