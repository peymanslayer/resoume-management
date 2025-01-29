import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'users/user.module';
import { UserEntity } from 'users/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule,AuthModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'Peyman1378P$',
      database:'resoume',
      entities:[UserEntity],
      synchronize:true
    }),
  ]
})
export class AppModule {}
