import { Controller, Get, Post, Body, Res, Query, UseFilters } from "@nestjs/common";
import { AddProjectDto } from "./dtos/addProject.dto";
import { Response } from 'express'
import { FilterProjectDto } from "./dtos/filterProject.dto";
import { ProjectFilterService } from "./services/projectFilter.service";
import { MysqlExceptionFilter } from "filters/mysql.filter";
import { ProjectsService } from "./services/projects.service";
@Controller('/api')
@UseFilters(new MysqlExceptionFilter())
export class ProjectsController {
  constructor(private readonly filterProjectService:ProjectFilterService,
              private readonly projectService:ProjectsService
  ){}

    @Post('/addProject')
    async addProject(@Body() project: AddProjectDto, @Res() response: Response) {
     const addProject=await this.projectService.addProject(project);
     response.status(addProject.status).json({message:addProject.message,data:addProject.data})
    }

    async filterProjects(
    @Query('beforeHistory') beforeHistory: string,
    @Query('afterHistory') afterHistory: string, 
    @Body() projectFilter: FilterProjectDto,
    @Res() response:Response
    ) {
      const filterProject=await this.filterProjectService.filterProjects(beforeHistory,afterHistory,projectFilter);
      response.status(filterProject.status).json({message:filterProject.message,data:filterProject.data})
    }
}