import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { AddUserDto } from "users/dtos/addUser.dto";
import { IAuth } from "./interfaces/auth.interface";
import { BaseResponse } from "baseResponse.dto";
import { LogInDto } from "./dtos/login.dto";
import { UserService } from "users/services/user.service";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "users/user.entity";
import { Repository } from "typeorm";
import { SignUpDto } from "./dtos/signUp.dto";

@Injectable()
export class AuthService implements IAuth {
    constructor(private readonly userServie: UserService,
        private readonly jwtService: JwtService,
        @InjectRepository(User) private readonly userRepo:Repository<User>
    ) { }
    async signUp(user: SignUpDto): Promise<BaseResponse<AddUserDto | string>> {
        const findUser = await this.userServie.getUserByMobile(user.mobile);
        if (findUser.data) {
            return {
                status: 203,
                message: 'user exist',
                data: 'cant signup'
            }
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const createUser = await this.userServie.addUser(user);
        createUser.data.password = hashedPassword;
        this.userRepo.save(createUser.data);
        return {
            status: 200,
            message: 'signup sucsses',
            data: createUser.data
        }
    }
    async login(user: LogInDto): Promise<BaseResponse<AddUserDto | string>> {
        const validateUser = await this.validateUser(user.password, user.mobile);
        
        if (validateUser.data) {
            // تولید توکن JWT
            const payload = { username: user.mobile, sub: user.password }; // اطلاعاتی که در توکن ذخیره می‌شود
            const token = this.jwtService.sign(payload); // تولید توک
            validateUser.data.token=token;
            this.userRepo.save(validateUser.data);
            return {
                status: 200,
                message: 'logIn sucsses',
                data: validateUser.data
            }
        }
        return {
            status: 400,
            message: 'login failed',
            data: 'not login'
        }
    }
    async validateUser(password: string, mobile: number): Promise<BaseResponse<AddUserDto | null>> {
        const findUser = await this.userServie.getUserByMobile(mobile);
        console.log(findUser.data);
        
        if (findUser.data) {
            const comparePassword = await bcrypt.compare(password, findUser.data.password);
            if (comparePassword) {
                return {
                    status: 200,
                    message: 'compare is true',
                    data: findUser.data
                }
            }
            return {
                status: 400,
                message: ' compare is false',
                data: null
            }
        } else {
            return {
                status: 400,
                message: 'user not found',
                data: null
            }
        }
    }
}