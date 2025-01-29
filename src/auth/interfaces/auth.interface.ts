import { LogInDto } from "auth/dtos/login.dto";
import { BaseResponse } from "baseResponse.dto";
import { AddUserDto } from "users/dtos/addUser.dto";

export interface IAuth{

  signUp(user:AddUserDto):Promise<BaseResponse<AddUserDto | string>>;
  login(user:LogInDto):Promise<BaseResponse<AddUserDto>>;
  validateUser(password:string , mobile:number):Promise<BaseResponse<AddUserDto | null>>

}