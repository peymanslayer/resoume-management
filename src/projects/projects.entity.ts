import { Entity , Column , PrimaryGeneratedColumn , ManyToOne } from "typeorm";
import { UserEntity } from "users/user.entity";

@Entity()
export class ProjectEntity{
  @PrimaryGeneratedColumn()
  id:number

  @Column({type:'varchar',nullable:false})
  project:string

  @Column({type:'varchar',nullable:false})
  projectDescription:string

  @Column({type:'json',nullable:false})
  projectSkills:string[]

  @ManyToOne(()=>UserEntity,(user)=>user.projects)
  userId:UserEntity
}