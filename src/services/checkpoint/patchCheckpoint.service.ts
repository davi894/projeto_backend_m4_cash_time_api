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
    function calculateDifference(time1, time2) {
      // convert times to minutes
      let minutes1 = time1.hours * 60 + time1.minutes;
      let minutes2 = time2.hours * 60 + time2.minutes;
      // calculate difference in minutes
      let difference = Math.abs(minutes2 - minutes1);
      // convert minutes back to hours and minutes
      let hours = Math.floor(difference / 60);
      let minutes = difference % 60;
      return { hours: hours, minutes: minutes };
    }
    console.log()
  }

 

  const users = AppDataSource.getRepository(User);
};

export default patchCheckpointService;
