import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'users/user.module';
import { User } from 'users/user.entity';
import { AuthModule } from './auth/auth.module';
import configurations from 'config/configurations';
import { ProjectEntity } from 'projects/projects.entity';
import { ProjectModule } from 'projects/projects.module';

@Module({
  imports: [UserModule,AuthModule,ProjectModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'), // به جای DATABASE_HOST
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [User,ProjectEntity],
        synchronize: false, // فقط در محیط توسعه فعال باشد
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load:[configurations]
    })
  ]
})
export class AppModule {}
