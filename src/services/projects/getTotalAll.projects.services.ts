import { AppDataSource } from "../../data-source"
import { Projects } from "../../entities/projects"

export const getTotalAllProjectsService = async () => {
    const projectsDatabase = AppDataSource.getRepository(Projects)

    const projects = await projectsDatabase.find({
        select: {
            name: true,
            totalValue: true
        }
    })

    return projects
}