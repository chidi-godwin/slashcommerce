import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from './user.dao';
import { IsUserAlreadyExistConstraint } from './validations/IsUserAlreadyExist.validator';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, IsUserAlreadyExistConstraint],
  imports: [PrismaModule],
  exports: [UserRepository],
})
export class UserModule {}
