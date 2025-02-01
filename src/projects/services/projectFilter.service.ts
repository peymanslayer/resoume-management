import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseResponse } from "baseResponse.dto";
import { AddProjectDto } from "projects/dtos/addProject.dto";
import { FilterProjectDto } from "projects/dtos/filterProject.dto";
import { IFilterProject } from "projects/interfaces/filterProject.interface";
import { ProjectEntity } from "projects/projects.entity";
import { Repository } from "typeorm";


@Injectable()

export class ProjectFilterService implements IFilterProject {
    constructor(@InjectRepository(ProjectEntity) private readonly projectRepo: Repository<ProjectEntity>) { }

    async filterProjects(beforeHistory:string,afterHistory:string,filterProject: FilterProjectDto): Promise<BaseResponse<AddProjectDto[]>> {
       // استفاده از nullish coalescing برای تعیین تاریخ‌های پیش‌فرض
       const beforeDate = beforeHistory ?? '2024/1/1';
       const afterDate = afterHistory ?? '2026/1/1';
      const filterProjects=await this.projectRepo.createQueryBuilder('project_entity')
      .andWhere('project_entity.projectName LIKE :projectName', { projectName: `%${filterProject.projectName}%` })
      .andWhere('project_entity.history BETWEEN :beforeDate AND :afterDate', { beforeDate, afterDate })
      .getMany();
      return{
        status:200,
        message:'result for filter',
        data:filterProjects
      }
    }
}