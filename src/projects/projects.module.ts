import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectEntity } from "./projects.entity";
import { ProjectsController } from "./projects.controller";
import { User } from "users/user.entity";
import { ProjectsService } from "./services/projects.service";
import { ProjectFilterService } from "./services/projectFilter.service";

@Module({
  imports:[TypeOrmModule.forFeature([ProjectEntity,User])],
  controllers:[ProjectsController],
  providers:[ProjectsService,ProjectFilterService],
})

export class ProjectModule{}