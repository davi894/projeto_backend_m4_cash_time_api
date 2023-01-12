import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from "typeorm";

import { User } from "./user";
import { Projects } from "./projects";

@Entity("checkpoint")
export class Checkpoint {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("time")
    entry: Date

    @Column("time")
    output: Date

    @Column()
    date: Date

    @ManyToOne(() => User,(u) => u.id )
    user_: User

    @ManyToOne(()=> Projects, (p) => p.id)
    projects_: Projects
}
  