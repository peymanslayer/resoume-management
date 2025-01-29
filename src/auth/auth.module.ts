import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "users/user.module";
import { UserService } from "users/services/user.service";
@Module({
  imports:[JwtModule.register({
    secret: 'SECRET_KEY',
    signOptions: { expiresIn: '1h' },
  }),UserModule],
  controllers:[AuthController],
  providers:[AuthService]
})

export class AuthModule{}

