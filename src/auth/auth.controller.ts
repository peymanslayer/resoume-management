import { Controller , Post , Get , Body , Res, UseFilters } from "@nestjs/common";
import { Response } from "express"
import { MysqlExceptionFilter } from "../filters/mysql.filter";
import { AddUserDto } from "../users/dtos/addUser.dto";
import { AuthService } from "./auth.service";


@Controller('/api')
@UseFilters(new MysqlExceptionFilter())
export class AuthController{
  constructor(private readonly authService:AuthService){}

  @Post('/signup')
  async signUp(@Body() user:AddUserDto,@Res() response:Response){
    const signUp=await this.authService.signUp(user);
    response.status(signUp.status).json({message:signUp.message,data:signUp.data})
  }
}