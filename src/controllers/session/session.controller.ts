import { Request, Response } from "express";
import createSessionService from "../../services/session/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
  const userData = req.body;
  const token = await createSessionService(userData);
  return res.status(200).json({ token });
};

export { createSessionController };
