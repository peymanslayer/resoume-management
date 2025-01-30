import { Controller , Get , Post , Body , Res} from "@nestjs/common";
import { AddProjectDto } from "./dtos/addProject.dto";
import { Response } from 'express'
@Controller('/api')

export class ProjectsController{
  @Post('/addProject')
  async addProject(@Body() project:AddProjectDto , @Res() response:Response){
    
  }
}