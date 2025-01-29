import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { AddUserDto } from "users/dtos/addUser.dto";
import { IAuth } from "./interfaces/auth.interface";
import { BaseResponse } from "baseResponse.dto";
import { LogInDto } from "./dtos/login.dto";
import { UserService } from "users/services/user.service";

@Injectable()
export class AuthService implements IAuth{
  constructor(private readonly userServie:UserService,
    private readonly jwtService: JwtService,
  ){}
   async signUp(user: AddUserDto): Promise<BaseResponse<AddUserDto | string>> {
      const findUser=await this.userServie.getUserByMobile(user.mobile);
      
      if(findUser.data){
       return{
        status:203,
        message:'user exist',
        data:'cant signup'
       }
      }
      const hashedPassword=await bcrypt.hash(user.password,10);
      // تولید توکن JWT
    const payload = { username: user.name, sub: user.password }; // اطلاعاتی که در توکن ذخیره می‌شود
    const token = this.jwtService.sign(payload); // تولید توکن
    const createUser=await this.userServie.addUser(user);
    createUser.data.password=hashedPassword;
    createUser.data.token=token;
    return{
      status:200,
      message:'signup sucsses',
      data:createUser.data
    }
    }
   async login(user: LogInDto): Promise<BaseResponse<AddUserDto>> {
        throw new Error("Method not implemented.");
    }
   async validateUser(password: string, mobile: number): Promise<BaseResponse<AddUserDto | null>> {
    throw new Error("Method not implemented.");
    //  const findUser=await this.userServie.getUserByLastName(lastName);
    //  if(findUser){
        
    //  }
    }
}