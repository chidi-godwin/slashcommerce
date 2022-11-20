import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StoreRepository } from './store.dao';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IsStoreAlreadyExistConstraint } from './validators/isStoreAlreadyExists.validator';

@Module({
  controllers: [StoreController],
  providers: [StoreService, StoreRepository, IsStoreAlreadyExistConstraint],
  imports: [PrismaModule],
})
export class StoreModule {}
