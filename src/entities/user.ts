import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { hashSync, getRounds } from "bcryptjs";
import { Projects } from "./projects";
import { Checkpoint } from "./checkpoint";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Projects, (p) => p.id)
  projects_: Projects[];

  @OneToMany(() => Checkpoint, (c) => c.id)
  checkpoints_: Checkpoint[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }
}
