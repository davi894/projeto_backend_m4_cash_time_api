import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BeforeInsert,
    OneToOne,
    ManyToOne,
    OneToMany
} from "typeorm"

import { User } from "./user";
import { Projects } from "./projects";

@Entity("checkpoint")
export class Checkpoint {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("time")
    entry: string

    @Column("time")
    output: Date

    @Column()
    day: Date

    @ManyToOne(() => User,(u) => u.id )
    user_: User

    @ManyToOne(()=> Projects, (p) => p.id)
    projects_: Projects
}
  