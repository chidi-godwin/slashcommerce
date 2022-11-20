import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [UserModule, PrismaModule, PrismaModule, StoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
