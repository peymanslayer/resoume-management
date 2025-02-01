import { IsOptional } from "class-validator";

export class FilterProjectDto{
  @IsOptional()
  projectName:string;
}