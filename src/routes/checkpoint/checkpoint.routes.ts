import { Router } from "express"
import finishCheckpointController from "../../controller/checkpoint/finishCheckpoint.controller"
import getPeriodController from "../../controller/checkpoint/getPeriod.controller"

const checkpointRoute = Router()

checkpointRoute.get("/checkpoint", getPeriodController)
checkpointRoute.patch("/checkpoint/:project_id", finishCheckpointController)


export default checkpointRoute