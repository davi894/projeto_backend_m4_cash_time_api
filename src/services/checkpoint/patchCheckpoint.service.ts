import AppError from "../../errors/AppError";
import { AppDataSource } from "../../data-source";
import { Checkpoint } from "../../entities/checkpoint";
import { Projects } from "../../entities/projects";
import { User } from "../../entities/user";
import { ICheckpointPost } from "../../interfaces/checkpoint";

const patchCheckpointService = async ({
  checkpoint_id,
  output,
  project_id,
}: any) => {

  const projects = await AppDataSource.getRepository(Projects).findOne({
    where: {
      id: project_id,
    },
  });

  const checkpoints = await AppDataSource.getRepository(Checkpoint).findOne({
    where: {
      id: checkpoint_id,
    },
  });
  const entry = checkpoints.entry.split(":");
 /*  const hourNumber = parseInt(entry[0]);
  const hourNumber = parseInt(entry[2]); */

  if (checkpoints.output) {
    
  }

  const users = AppDataSource.getRepository(User);
};

export default patchCheckpointService;
