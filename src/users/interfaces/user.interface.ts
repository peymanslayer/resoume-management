import { AddUserDto } from "../dtos/addUser.dto";
import { BaseResponse } from "../../baseResponse.dto";
import { UpdateUserDto } from "../dtos/updateUser.dto";

export interface IUser{
  addUser(user:AddUserDto):Promise<BaseResponse<AddUserDto>>;
  updateUser(id:number,user:UpdateUserDto):Promise<BaseResponse<AddUserDto | []>>;
  deleteUser(id:number):Promise<BaseResponse<string>>;
  getUser(id:number):Promise<BaseResponse<AddUserDto | string>>;
  getUserByMobile(mobile:number):Promise<BaseResponse<AddUserDto|null>>
  getAllUsers():Promise<BaseResponse<AddUserDto[]>>;
}