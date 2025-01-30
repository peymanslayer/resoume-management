import { IsArray, IsEmail , IsNotEmpty , IsOptional, MaxLength , MinLength, ValidateNested} from "class-validator"
import { ProjectEntity } from "projects/projects.entity"
import { Type } from 'class-transformer';
import { AddProjectDto } from "projects/dtos/addProject.dto";

export class AddUserDto{
  @IsNotEmpty()
  name:string

  @IsEmail()
  @IsNotEmpty()
  email:string

  @IsNotEmpty()
  lastName:string

  @IsNotEmpty()
  role:string

  @IsNotEmpty()
  mobile:number

  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(8)
  password:string

  @IsOptional()
  token:string

  @IsOptional()
  description:string

  @IsNotEmpty()
  education:string

  @IsArray()
  @IsNotEmpty()
  skills:string[]

  @IsOptional()
  experience:string

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddProjectDto)
  projects:ProjectEntity[]

}