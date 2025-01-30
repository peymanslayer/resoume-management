import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectEntity } from "./projects.entity";
import { ProjectsController } from "./projects.controller";
import { UserEntity } from "users/user.entity";

@Module({
  imports:[TypeOrmModule.forFeature([ProjectEntity,UserEntity])],
  controllers:[ProjectsController],
  providers:[],
})

export class ProjectModule{}