import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IUser } from "../interfaces/user.interface";
import { AddUserDto } from "../dtos/addUser.dto";
import { BaseResponse } from "../../baseResponse.dto";
import { UpdateUserDto } from "../dtos/updateUser.dto";
import { UserEntity } from "../user.entity";
import { SignUpDto } from "auth/dtos/signUp.dto";


@Injectable()
export class UserService implements IUser {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }


  async addUser(user: AddUserDto | SignUpDto): Promise<BaseResponse<AddUserDto>> {
    const addUser = await this.userRepository.save(user);
    return {
      status: 201,
      message: 'user created',
      data: addUser
    }
  }


  async updateUser(id: number, user: UpdateUserDto): Promise<BaseResponse<AddUserDto | []>> {
    const updateUser = await this.userRepository.update(id, user);
    if (updateUser.affected == 0) {
      return {
        status: 400,
        message: 'user dont update',
        data: []
      }
    }
    const findUser = await this.userRepository.findOne({ where: { id: id } });
    return {
      status: 200,
      message: 'user updated',
      data: findUser
    }
  }


  async deleteUser(id: number): Promise<BaseResponse<string>> {
    const deleteUser = await this.userRepository.delete(id);
    if (deleteUser.affected === 0) {
      return {
        status: 400,
        message: 'user not deleted',
        data: 'delete failed'
      }
    }
    return {
      status: 200,
      message: "user deleted",
      data: 'delete sucsesfully'
    };
  }


  async getUser(id: number): Promise<BaseResponse<AddUserDto | string>> {
    const findUser = await this.userRepository.findOne({ where: { id: id } });
    if (!findUser) {
      return {
        status: 400,
        message: 'user not exist',
        data: 'user not found'
      }
    }
    return {
      status: 200,
      message: 'user exist',
      data: findUser
    }
  }
  async getAllUsers(): Promise<BaseResponse<AddUserDto[]>> {
    const findUsers = await this.userRepository.find();
    return {
      status: 200,
      message: 'users founded',
      data: findUsers
    }

  }

  async getUserByMobile(mobile: number): Promise<BaseResponse<AddUserDto | null>> {
    const getUserByMobile=await this.userRepository.findOne({where:{mobile:mobile}});
    return{
      status:200,
      message:'result of user',
      data:getUserByMobile
    }
  }
}