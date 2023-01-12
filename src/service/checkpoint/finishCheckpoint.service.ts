import AppError from "../../errors/AppError"
import { AppDataSource } from "../../data-source"
import { Checkpoint } from "../../entities/checkpoint"
import { Projects } from "../../entities/projects"
import { User } from "../../entities/user"

const finishCheckpointService = async (projectId: string, userId: string): Promise<void> => {
    const checkpoints = AppDataSource.getRepository(Checkpoint)
    const projects = AppDataSource.getRepository(Projects)
    const users = AppDataSource.getRepository(User)

    const { }
}

export default finishCheckpointService    