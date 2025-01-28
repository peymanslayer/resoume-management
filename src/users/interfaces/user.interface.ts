import { AddUserDto } from "../dtos/addUser.dto";
import { BaseResponse } from "../dtos/baseResponse.dto";
import { UpdateUserDto } from "../dtos/updateUser.dto";
import { UserEntity } from "../user.entity";

export interface IUser{
  addUser(user:AddUserDto):Promise<BaseResponse<UserEntity>>;
  updateUser(id:number,user:UpdateUserDto):Promise<BaseResponse<UserEntity | []>>;
  deleteUser(id:number):Promise<BaseResponse<string>>;
  getUser(id:number):Promise<BaseResponse<UserEntity | string>>;
  getAllUsers():Promise<BaseResponse<UserEntity[]>>;
}