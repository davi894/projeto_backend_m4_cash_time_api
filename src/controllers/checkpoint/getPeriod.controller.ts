import { Request, Response } from "express";
import { ICheckPointInterval } from "../../interfaces/checkpoint";
import getPeriodService from "../../service/checkpoint/getPeriod.service";

const reqBody = {
  initialRange: "2020/12/19",
  finalInterval: "2021/12/19",
  project_id: "string",
  user_id: "string",
};

const getPeriodController = async (req: Request, res: Response) => {
  const period = req.params;

  const listUsers = await getPeriodService(reqBody);

  return res.status(200).json(listUsers);
};

export default getPeriodController;
