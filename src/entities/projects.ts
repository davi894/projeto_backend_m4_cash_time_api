import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { User } from "./user";
import { Checkpoint } from "./checkpoint";
import { time } from "console";

@Entity("projects")
export class Projects {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column("float")
  hourValue: number;

  @Column()
  status: string;

  @Column("float")
  totalValue: number;

  @Column("time")
  totalTime: Date;

  @OneToMany(() => Checkpoint, (c) => c.id)
  checkpoint_: Checkpoint[];

  @ManyToOne(() => User, (u) => u.id)
  user_: User;
}
