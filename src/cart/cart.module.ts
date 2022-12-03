import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CartRepository } from './cart.dao';

@Module({
  controllers: [CartController],
  providers: [CartService, CartRepository],
  imports: [PrismaModule],
})
export class CartModule {}
