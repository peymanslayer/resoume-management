import { IsArray, IsNotEmpty , IsOptional } from "class-validator";

export class UpdateProjectDto {

    @IsNotEmpty()
    id: number

    @IsOptional()
    project: string;

    @IsOptional()
    projectDescription: string

    @IsArray()
    @IsOptional()
    projectSkills: string[]

}