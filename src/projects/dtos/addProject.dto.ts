import { Type } from "class-transformer/types";
import { IsNotEmpty, IsArray, IsOptional, ValidateNested } from "class-validator/types";
import { UserEntity } from "users/user.entity";

export class AddProjectDto {
    @IsNotEmpty()
    project: string;

    @IsNotEmpty()
    projectDescription: string

    @IsArray()
    @IsNotEmpty()
    projectSkills: string[]

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UserEntity)
    userId: UserEntity
}