import { Module , forwardRef } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "@nestjs/config";
import { UserModule } from "users/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "users/user.entity";
import { UserService } from "users/services/user.service";

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]),JwtModule.registerAsync({ // استفاده از registerAsync برای بارگذاری پیکربندی
    imports: [ConfigModule], // وارد کردن ConfigModule
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('jwt.secret'), // استفاده از ConfigService برای دریافت کلید
      signOptions: { expiresIn: configService.get<string>('jwt.expiresIn') }, // استفاده از ConfigService برای زمان انقضا
    }),
    inject: [ConfigService], // تزریق ConfigService
}) ],
  controllers:[AuthController],
  providers:[AuthService , UserService]
})

export class AuthModule{}

