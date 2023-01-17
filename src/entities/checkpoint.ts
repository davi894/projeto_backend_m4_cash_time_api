import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { User } from "./user";
import { Projects } from "./projects";

@Entity("checkpoint")
export class Checkpoint {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "time" })
  entry: string;

  @Column({ type: "time" })
  output: string;

  @Column({ type: "date" })
  date: string;

  @ManyToOne(() => User, (u) => u.id)
  user_: User;

  @ManyToOne(() => Projects, (p) => p.id)
  projects_: Projects;
}
