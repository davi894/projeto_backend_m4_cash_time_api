import AppError from "../../errors/AppError";
import { AppDataSource } from "../../data-source";
import { Checkpoint } from "../../entities/checkpoint";
import { Projects } from "../../entities/projects";
import { User } from "../../entities/user";
import {
  ICheckinRequestUpdate,
  ICheckpointPost,
} from "../../interfaces/checkpoint";
import { calculateTime, splitHour } from "../../utils";

const patchCheckpointService = async ({
  checkpoint_id,
  output,
  project_id,
}: ICheckinRequestUpdate) => {
  const projects = await AppDataSource.getRepository(Projects).findOne({
    where: {
      id: project_id,
    },
  });

  const users = AppDataSource.getRepository(User);
  const checkpointRepository = AppDataSource.getRepository(Checkpoint);
  const projectRepository = AppDataSource.getRepository(Projects);

  const checkpoints = await AppDataSource.getRepository(Checkpoint).findOne({
    where: {
      id: checkpoint_id,
    },
  });

  let timeProject = projects.totalTime;

  if (checkpoints.output) {
    const receivedDifference = calculateTime(
      splitHour(checkpoints.entry),
      splitHour(checkpoints.output),
      "dif"
    );

    timeProject = calculateTime(
      splitHour(timeProject),
      splitHour(receivedDifference),
      "dif"
    );
  }

  let outputSplited = splitHour(output);

  if (outputSplited[0] < splitHour(checkpoints.entry)[0]) {
    outputSplited[0] = outputSplited[0] + 24;
    output = outputSplited.join(":");
  }

  const newTime = calculateTime(
    splitHour(checkpoints.entry),
    splitHour(output),
    "dif"
  );

  timeProject = calculateTime(splitHour(timeProject), splitHour(newTime));

  const updateCheckpoint = checkpointRepository.create({
    ...checkpoints,
    output: output,
  });

  await checkpointRepository.save(updateCheckpoint);

  const updateProject = projectRepository.create({
    ...projects,
    totalTime: timeProject,
  });

  await projectRepository.save(updateProject);

  return { message: "Checkpoint Updated" };
};

export default patchCheckpointService;
