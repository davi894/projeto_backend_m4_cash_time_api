import AppError from "../../error/AppError";
import { AppDataSource } from "../../data-source";
import { Checkpoint } from "../../entities/checkpoint";
import { Projects } from "../../entities/projects";
import { User } from "../../entities/user";
import { ICheckinRequestUpdate } from "../../interfaces/checkpoint";
import { calculateTime, splitHour } from "../../utils";

const patchCheckpointService = async (date, projectID: string) => {
  AppDataSource.getRepository(User);
  const checkpointRepository = AppDataSource.getRepository(Checkpoint);
  const projectRepository = AppDataSource.getRepository(Projects);

  const projects = await AppDataSource.getRepository(Projects).findOne({
    where: {
      id: projectID,
    },
  });

  const checkpoints = await AppDataSource.getRepository(Checkpoint).findOne({
    where: {
      id: date.checkpoint_id,
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

  let outputSplited = splitHour(date.output);

  if (outputSplited[0] < splitHour(checkpoints.entry)[0]) {
    outputSplited[0] = outputSplited[0] + 24;
    date.output = outputSplited.join(":");
  }

  const newTime = calculateTime(
    splitHour(checkpoints.entry),
    splitHour(date.output),
    "dif"
  );

  timeProject = calculateTime(splitHour(timeProject), splitHour(newTime));

  const updateCheckpoint = checkpointRepository.create({
    ...checkpoints,
    output: date.output,
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
