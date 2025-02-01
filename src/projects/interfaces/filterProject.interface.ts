import { BaseResponse } from "baseResponse.dto";
import { AddProjectDto } from "projects/dtos/addProject.dto";
import { FilterProjectDto } from "projects/dtos/filterProject.dto";

export interface IFilterProject {
    filterProjects(beforeHistory: string, afterHistory: string, filterProject: FilterProjectDto): Promise<BaseResponse<AddProjectDto[]>>
}