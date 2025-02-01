import { Type } from "class-transformer";
import { IsNotEmpty, IsArray, IsOptional, ValidateNested } from "class-validator";
import { User } from "users/user.entity";

export class AddProjectDto {
    @IsNotEmpty()
    projectName: string;

    @IsNotEmpty()
    projectDescription: string

    @IsNotEmpty()
    history:string

    @IsArray()
    @IsNotEmpty()
    projectSkills: string[]

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => User)
    userId: User
}