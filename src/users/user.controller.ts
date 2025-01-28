import { Controller ,Get , Post, Body , Res  } from "@nestjs/common";
import { Response } from "express";
import { AddUserDto } from "./dtos/addUser.dto";

@Controller('/api')
export class UserController{
    constructor(){}
  @Post('/addUser')
  async addUser(@Res() response:Response , @Body() user:AddUserDto){
    
  }
}