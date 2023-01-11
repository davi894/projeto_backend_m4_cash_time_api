import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BeforeInsert,
    OneToMany,
    OneToOne,
    ManyToOne,
  } from "typeorm";
 import { hash } from "bcryptjs"; 
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
  
    @Column({default:true})
    isActive: boolean;
  
   @OneToMany(()=> Projects, (p)=> p.id)
   projects_: Projects[]

   @OneToMany(()=> Checkpoint, (c)=>c.id)
   checkpoints_: Checkpoint[]

    @BeforeInsert()
    async hashPassword() {
      this.password = await hash(this.password, 10);
    }
}