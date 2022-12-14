import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRespository } from './product.dao';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRespository],
  imports: [PrismaModule],
  exports: [ProductRespository],
})
export class ProductModule {}
