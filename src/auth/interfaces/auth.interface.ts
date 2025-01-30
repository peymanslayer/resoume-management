import { LogInDto } from "auth/dtos/login.dto";
import { SignUpDto } from "auth/dtos/signUp.dto";
import { BaseResponse } from "baseResponse.dto";
import { AddUserDto } from "users/dtos/addUser.dto";

export interface IAuth{

  signUp(user:SignUpDto):Promise<BaseResponse<AddUserDto | string>>;
  login(user:LogInDto):Promise<BaseResponse<AddUserDto | string>>;
  validateUser(password:string , mobile:number):Promise<BaseResponse<AddUserDto | null>>

}