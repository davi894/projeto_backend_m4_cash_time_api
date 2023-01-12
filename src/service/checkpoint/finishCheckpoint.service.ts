import AppError from "../../errors/AppError"
import { AppDataSource } from "../../data-source"
import { Checkpoint } from "../../entities/checkpoint"
import { Projects } from "../../entities/projects"
import { User } from "../../entities/user"
import { ICheckpointPost } from "../../interfaces/checkpoint"

const finishCheckpointService = async (checkpointData: ICheckpointPost) => {
    const checkpoints = AppDataSource.getRepository(Checkpoint)
    const projects = AppDataSource.getRepository(Projects)
    const users = AppDataSource.getRepository(User)

    const { date,entry,project_id,user_id,} = checkpointData
}

export default finishCheckpointService    