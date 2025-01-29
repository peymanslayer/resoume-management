import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "users/user.module";
import { ConfigService } from "@nestjs/config";

@Module({
  imports:[JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn:process.env.EXPEIRES_IN },
  }),UserModule],
  controllers:[AuthController],
  providers:[AuthService]
})

export class AuthModule{}

