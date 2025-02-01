import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator"

export class SignUpDto{
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


}