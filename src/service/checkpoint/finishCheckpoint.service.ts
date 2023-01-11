import { AppError } from "../../errors/AppError"
import { AppDataSource } from "../../data-source"
import { Checkpoint } from "../../entities/checkpoint"
import { Projects } from "../../entities/projects"
import { User } from "../../entities/user"

const finishCheckpointService = async () => {
    const checkpoints = AppDataSource.getRepository(Checkpoint)
    const projects = AppDataSource.getRepository(Projects)
    const users = AppDataSource.getRepository(User)


}

export default finishCheckpointService    