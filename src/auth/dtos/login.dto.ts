import { IsEmail, IsNotEmpty } from "class-validator";

export class LogInDto{
  @IsNotEmpty()
  mobile:number

  @IsNotEmpty()
  password:string
}