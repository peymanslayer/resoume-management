import { Entity , Column , PrimaryGeneratedColumn } from "typeorm";

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

   @Column({type:'varchar'})
   token:string
}