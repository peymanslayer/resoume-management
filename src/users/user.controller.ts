import { Controller, Get, Post, Body, Res, UseFilters } from "@nestjs/common";
import { Response } from "express";
import { AddUserDto } from "./dtos/addUser.dto";
import { UserService } from "./services/user.service";
import { MysqlExceptionFilter } from "filters/mysql.filter";

@Controller('/api')
@UseFilters(new MysqlExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/addUser')
  async addUser(@Res() response: Response, @Body() user: AddUserDto) {
    const addUser = await this.userService.addUser(user);
    response.status(addUser.status).json({message:addUser.message,data:addUser.data})
  }

}