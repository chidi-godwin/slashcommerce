import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryService, CloudinaryProvider],
  controllers: [CloudinaryController],
  imports: [ConfigModule],
})
export class CloudinaryModule {}
