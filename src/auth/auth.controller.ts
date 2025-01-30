import { Controller , Post , Get , Body , Res, UseFilters } from "@nestjs/common";
import { Response } from "express"
import { MysqlExceptionFilter } from "../filters/mysql.filter";
import { AuthService } from "./auth.service";
import { LogInDto } from "./dtos/login.dto";
import { SignUpDto } from "./dtos/signUp.dto";


@Controller('/api')
@UseFilters(new MysqlExceptionFilter())
export class AuthController{
  constructor(private readonly authService:AuthService){}

  @Post('/signup')
  async signUp(@Body() user:SignUpDto,@Res() response:Response){
    const signUp=await this.authService.signUp(user);
    response.status(signUp.status).json({message:signUp.message,data:signUp.data})
  }

  @Post('/login')
  async logIn(@Body() user:LogInDto,@Res() response:Response){
    const logIn=await this.authService.login(user);
    response.status(logIn.status).json({message:logIn.message,data:logIn.data})
  }
}