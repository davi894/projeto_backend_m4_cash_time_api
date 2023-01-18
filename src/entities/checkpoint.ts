import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { User } from "./user";
import { Projects } from "./projects";

@Entity("checkpoint")
export class Checkpoint {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "time" })
  entry: string;

  @Column({ type: "time", nullable: true })
  output: string;

  @Column({ type: "date" })
  date: string;

  @ManyToOne(() => User, (u) => u.id)
  @JoinColumn()
  user_: User;

  @ManyToOne(() => Projects, (p) => p.id)
  @JoinColumn()
  projects_: Projects;
}
