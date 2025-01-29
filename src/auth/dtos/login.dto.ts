import { IsEmail, IsNotEmpty } from "class-validator/types";

export class LogInDto{
  @IsNotEmpty()
  @IsEmail()
  email:string

  @IsNotEmpty()
  password:string
}