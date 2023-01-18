import { AppDataSource } from "../../data-source";
import { Checkpoint } from "../../entities/checkpoint";
import { ICheckPointInterval } from "../../interfaces/checkpoint";

const getPeriodService = async (
  periodData: ICheckPointInterval,
  projectId: string,
  userId: string
) => {
  const checkpoints = AppDataSource.getRepository(Checkpoint);

  const { initialRange, finalInterval } = periodData;

  const foundPeriod = await checkpoints
    .createQueryBuilder("checkpoint")
    .leftJoinAndSelect("checkpoint.user_", "user")
    .where("user.id = :id", { id: userId })
    .andWhere("checkpoint.date  >= :initialDate", { initialDate: initialRange })
    .andWhere("checkpoint.date  <= :finalDate", { finalDate: finalInterval })
    .getMany();

  return foundPeriod;
};

export default getPeriodService;
