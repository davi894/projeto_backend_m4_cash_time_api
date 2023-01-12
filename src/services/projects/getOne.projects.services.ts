import { AppDataSource } from "../../data-source"
import { Projects } from "../../entities/projects"
import AppError from "../../errors/AppError"

export const getOneProjectService = async (params) => {
    const projectsDatabase = AppDataSource.getRepository(Projects)
    const project = await projectsDatabase.findOneBy({
        id: params.id
    })
    console.log(project)
    if(!project) {
        throw new AppError(404, "Project not found!")
    }
    return [200, project]
}