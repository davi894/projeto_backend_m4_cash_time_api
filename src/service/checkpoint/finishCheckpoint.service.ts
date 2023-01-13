import AppError from "../../errors/AppError"
import { AppDataSource } from "../../data-source"
import { Checkpoint } from "../../entities/checkpoint"
import { Projects } from "../../entities/projects"
import { User } from "../../entities/user"
import { ICheckpointPost } from "../../interfaces/checkpoint"

const finishCheckpointService = async (checkpointData: ICheckpointPost) => {
    const checkpoints = AppDataSource.getRepository(Checkpoint)
    const projects = AppDataSource.getRepository(Projects)

    const { date, entry, output, project_id, user_id,} = checkpointData

    const finishPeriod = await checkpoints
    .createQueryBuilder("checkpoint")
    .leftJoinAndSelect("checkpoint.projects_id", "projects")
    .where("projects.id = :id", { id: project_id })
    .andWhere("checkpoint.output  = :output",{ output: output })
    .getOne();

    const period = checkpoints.create({
        ...finishPeriod,
        ...checkpointData
    })

    await checkpoints.save({...finishPeriod})

    return period

}

export default finishCheckpointService    