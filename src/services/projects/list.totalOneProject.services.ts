import { AppDataSource } from "../../data-source"
import { Projects } from "../../entities/projects"

export const listTotalOneProjectsService = async ()=>{
    const projectsRepository = AppDataSource.getRepository(Projects)
    const projects = await projectsRepository.find()
    return [200,projects]

}