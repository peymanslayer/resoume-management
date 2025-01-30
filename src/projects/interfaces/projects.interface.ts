import { BaseResponse } from "baseResponse.dto";
import { AddProjectDto } from "projects/dtos/addProject.dto";
import { UpdateProjectDto } from "projects/dtos/updateProject.dto";

export interface IProjects{
  addProject(project:AddProjectDto):Promise<BaseResponse<AddProjectDto | string>>;
  updateProject(project:UpdateProjectDto):Promise<BaseResponse<AddProjectDto | string>>;
  getProject(id:number):Promise<BaseResponse<AddProjectDto | null>>;
  getAllProjects():Promise<BaseResponse<AddProjectDto[]>>;
}