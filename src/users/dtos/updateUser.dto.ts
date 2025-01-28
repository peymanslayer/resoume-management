import { IsOptional , IsEmail , MinLength , MaxLength , IsNotEmpty } from "class-validator";


export class UpdateUserDto{
  @IsOptional()
  @IsEmail()
  email?:string;

  @IsOptional()
  @MinLength(6)
  @MaxLength(20)
  password?:string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  name?:string;

  @IsOptional()
  @MaxLength(25)
  lastName?:string;

  @IsOptional()
  @MaxLength(10)
  role?:string;


  
}