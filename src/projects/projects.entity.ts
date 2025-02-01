import { Entity , Column , PrimaryGeneratedColumn , ManyToOne } from "typeorm";
import { User } from "../users/user.entity";

@Entity('project')
export class ProjectEntity{
  @PrimaryGeneratedColumn()
  id:number

  @Column({type:'varchar',nullable:false})
  projectName:string

  @Column({type:'varchar',nullable:false})
  projectDescription:string

  @Column({type:'json',nullable:false})
  projectSkills:string[]

  @Column({type:'varchar',nullable:false})
  history:string

  @ManyToOne(()=>User,(user)=>user.projects)
  userId:User
}