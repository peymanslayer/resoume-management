import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectEntity } from "../projects.entity";
import { IProjects } from "../interfaces/projects.interface";
import { BaseResponse } from "baseResponse.dto";
import { AddProjectDto } from "../dtos/addProject.dto";
import { UpdateProjectDto } from "../dtos/updateProject.dto";

@Injectable()
export class ProjectsService implements IProjects {
    constructor(@InjectRepository(ProjectEntity) private readonly projectRepo: Repository<ProjectEntity>) { }
    async addProject(project: AddProjectDto): Promise<BaseResponse<AddProjectDto | string>> {
        const addProject = await this.projectRepo.save(project);
        if (addProject) {
            return {
                status: 201,
                message: 'project for user created',
                data: addProject
            }
        }
        return {
            status: 400,
            message: 'project dont create',
            data: 'failed'
        }
    }
    async updateProject(project: UpdateProjectDto): Promise<BaseResponse<AddProjectDto | string>> {
        const updateProject = await this.projectRepo.update(project.id, project)
        if (updateProject.affected == 0) {
            return {
                status: 400,
                message: 'project dont update',
                data: 'failed'
            }
        };
        const findProject = await this.getProject(project.id);
        return {
            status: 200,
            message: 'project updated',
            data: findProject.data
        }
    }
    async getProject(id: number): Promise<BaseResponse<AddProjectDto | null>> {
        const getProject = await this.projectRepo.findOne({ where: { id: id } });
        return {
            status: 200,
            message: 'project found',
            data: getProject
        }
    }
    async getAllProjects(): Promise<BaseResponse<AddProjectDto[]>> {
        const getAllProjects = await this.projectRepo.find({
            take: 20
        });

        return {
            status: 200,
            message: 'projects founded',
            data: getAllProjects
        }

    }

}