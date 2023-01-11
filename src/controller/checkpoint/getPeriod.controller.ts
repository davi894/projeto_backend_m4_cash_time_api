import { Request, Response } from "express"
import getPeriodService from "../../service/checkpoint/getperiod.service"

const getPeriodController = async (req: Request, res: Response) => {

    const listUsers = await getPeriodService()
    
    return res.status(200).json(listUsers)
}

export default getPeriodController