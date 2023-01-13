import { Request, Response } from "express"
import { ICheckpointPost } from "../../interfaces/checkpoint"
import getPeriodService from "../../service/checkpoint/getPeriod.service"

const getPeriodController = async (req: Request, res: Response) => {

    const period: ICheckpointPost = req.params
    const listUsers = await getPeriodService(period)
    
    return res.status(200).json(listUsers)
}

export default getPeriodController