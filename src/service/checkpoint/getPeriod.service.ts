import { AppError } from "../../errors/AppError"
import { AppDataSource } from "../../data-source"
import { Checkpoint } from "../../entities/checkpoint"
import { Projects } from "../../entities/projects"
import { User } from "../../entities/user"
import { ICheckpointPost } from "../../interfaces/checkpoint"

const getPeriodService = async (periodData: ICheckpointPost) => {
    const checkpoints = AppDataSource.getRepository(Checkpoint)
    const projects = AppDataSource.getRepository(Projects)
    const users = AppDataSource.getRepository(User)

    const { project_id, user_id, entry, output, day} = periodData
}

export default getPeriodService 