import { Module , forwardRef} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'users/user.controller';
import { UserService } from 'users/services/user.service';
import { AuthModule } from 'auth/auth.module';
import { User } from './user.entity';
import { ProjectEntity } from 'projects/projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,ProjectEntity]), forwardRef(() => AuthModule),],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
