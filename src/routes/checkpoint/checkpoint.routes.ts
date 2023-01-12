import express from "express"
import { Router } from "express"
import finishCheckpointController from "../../controllers/checkpoint/finishCheckpoint.controller"
import getPeriodController from "../../controllers/checkpoint/getPeriod.controller"

const routerCheckpoint = Router()

routerCheckpoint.get("/checkpoint", getPeriodController)
routerCheckpoint.patch("/checkpoint/:project_id", finishCheckpointController)
routerCheckpoint.post("/checkpoint/:project_id",)
routerCheckpoint.get("/checkpoint/:id")

export default routerCheckpoint

