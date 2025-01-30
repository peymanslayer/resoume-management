import { Module , forwardRef} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'users/user.controller';
import { UserService } from 'users/services/user.service';
import { AuthModule } from 'auth/auth.module';
import { UserEntity } from './user.entity';
import { ProjectEntity } from 'projects/projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,ProjectEntity]), forwardRef(() => AuthModule),],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
