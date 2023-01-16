import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { User } from "./user";
import { Checkpoint } from "./checkpoint";

@Entity("projects")
export class Projects {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "float" })
  hourValue: number;

  @Column()
  status: string;

  @Column({ type: "float" })
  totalValue: number;

  @Column()
  totalTime: string;

  @OneToMany(() => Checkpoint, (c) => c.id)
  @JoinColumn()
  checkpoint_: Checkpoint[];

  @ManyToOne(() => User, (u) => u.id)
  @JoinColumn()
  user_: User;
}
