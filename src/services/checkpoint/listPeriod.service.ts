import { AppDataSource } from "../../data-source";
import { Checkpoint } from "../../entities/checkpoint";
import { ICheckPointInterval } from "../../interfaces/checkpoint";

const getPeriodService = async (periodData: ICheckPointInterval) => {
  const checkpoints = AppDataSource.getRepository(Checkpoint);

  const { user_id, initialRange, finalInterval } = periodData;

  const foundPeriod = await checkpoints
    .createQueryBuilder("checkpoint")
    .leftJoinAndSelect("checkpoint.user_id", "user")
    .where("user.id = :id", { id: user_id })
    .andWhere("checkpoint.date  >= :initialDate", { initialDate: initialRange })
    .andWhere("checkpoint.date  <= :finalDate", { finalDate: finalInterval })
    .getMany();

  return foundPeriod;
};

export default getPeriodService;
