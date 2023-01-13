import { Request, Response } from "express"
import finishCheckpointService from "../../service/checkpoint/finishCheckpoint.service"

const finishCheckpointController = async (req: Request, res: Response) => {

    const finishCheckpoint = await finishCheckpointService()
    
    return res.status(200).json(finishCheckpoint)
}

export default finishCheckpointController