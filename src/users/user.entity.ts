import { ProjectEntity } from "projects/projects.entity";
import { Entity , Column , PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class UserEntity {
   @PrimaryGeneratedColumn()
   id:number;
   
   @Column({length:500 , nullable:false , type:'varchar'})
   name:string;

   @Column({nullable:false , type:'varchar'})
   lastName:string;

   @Column({nullable:false , unique:true , type:'int'})
   mobile:number;

   @Column({nullable:false , type:'varchar'})
   password:string;

   @Column({nullable:false , unique:true , type:'varchar'})
   email:string;

   @Column({type:'varchar' , default:'user'})
   role:string

   @Column({type:'varchar',default:null})
   token:string

   @Column({type:'varchar',nullable:true})
   description:string

   @Column({type:'varchar',nullable:false})
   education:string
  
   @Column({type:'json',nullable:false})
   skills:string[]

   @Column({type:'varchar',nullable:true})
   experience:string

   @OneToMany(()=>ProjectEntity,(project)=>project.userId)
   projects:ProjectEntity[]

}