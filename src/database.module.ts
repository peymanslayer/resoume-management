import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "users/user.entity";

Module({
  imports:[
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'Peyman1378P$',
      database:'resoume',
      entities:[UserEntity],
      synchronize:true
    })
  ],

})

export class DatabaseModule {}